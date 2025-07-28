import json
import os
import subprocess
import numpy as np
import librosa
from PIL import Image, ImageDraw, ImageFont
from moviepy import (
    AudioFileClip,
    VideoClip,
    ImageClip,
    concatenate_audioclips,
    CompositeVideoClip,
    TextClip,
    vfx,
    video,
)
from moviepy.audio.fx import AudioFadeOut

# --- CONFIG ---
MUSIC_DATA_PATH = '../public/music-data.json'
BASE_AUDIO_PATH = '../public'
CENTER_IMG_PATH = '../public/items/shlageball/shlageball.png'
BG_IMG_DIR = './clip'
LOGO_PATH = '../public/logo.png'
TITLE_FONT_PATH = './clip/LilitaOne-Regular.ttf'
TITLE_COLOR = '#fafafa'
TITLE_STROKE_COLOR = '#010101'
OUTPUT_DIR = './musique'
TMP_DIR = os.path.join(OUTPUT_DIR, '_tmp')
BASE_COLOR = (22, 101, 170)
W, H = 1920, 1080
FPS = 60

def load_music_data():
    with open(MUSIC_DATA_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_audio_wav_path(music):
    """
    Cherche le fichier WAV correspondant à la musique (par le nom, sans tenir compte du sous-dossier),
    dans tout le dossier 'musique/source/' et ses sous-dossiers.
    """
    import glob
    base = os.path.basename(music['url'])
    name, _ = os.path.splitext(base)
    pattern = os.path.join('musique', 'source', '**', f"{name}.wav")
    results = glob.glob(pattern, recursive=True)
    if results:
        return results[0]

    # WAV not found, try converting from source OGG
    ogg_path = get_public_full_path(music['url'])
    if not os.path.isfile(ogg_path):
        return None

    rel = music['url'].lstrip('/')
    if rel.startswith('audio/musics/'):
        rel = rel[len('audio/musics/') :]
    target_dir = os.path.join('musique', 'source', os.path.dirname(rel))
    os.makedirs(target_dir, exist_ok=True)
    wav_path = os.path.join(target_dir, f"{name}.wav")
    cmd = ['ffmpeg', '-y', '-i', ogg_path, '-ar', '48000', wav_path]
    try:
        subprocess.run(cmd, check=True)
    except Exception as e:
        print(f"ffmpeg conversion failed for {ogg_path}: {e}")
        return None
    return wav_path if os.path.isfile(wav_path) else None


def get_public_full_path(url):
    """Return the absolute path for a file located in the public directory."""
    return os.path.join('../public', url.strip('/'))

def decide_loops(audio_path):
    """Return the number of loops required for a track.

    Music shorter than a minute should be repeated enough times so the
    resulting clip lasts at least two minutes.
    """
    y, sr = librosa.load(audio_path, sr=None)
    duration = librosa.get_duration(y=y, sr=sr)
    if duration >= 60:
        return 1
    # ensure the final length is at least 120 seconds
    return max(2, int(np.ceil(120 / duration)))

def make_audio_clip(music):
    path = get_audio_wav_path(music)
    if not os.path.isfile(path):
        print(f"File not found: {path}")
        return None
    loops = decide_loops(path)
    clip = AudioFileClip(path)
    final_clip = concatenate_audioclips([clip] * loops)
    # fade out during the last second of the audio
    if hasattr(final_clip, "audio_fadeout"):
        return final_clip.audio_fadeout(1)
    return final_clip.with_effects([AudioFadeOut(1)])

def make_audio_spectrum_clip(audio_path, duration, width=W, height=180, n_bars=64):
    """Create an audio spectrum clip with transparent background.

    Bars use the application's main color with a vertical gradient
    fading to transparent towards the top.
    """
    def bar_color(_i):
        return BASE_COLOR
    y, sr = librosa.load(audio_path, sr=None, mono=True)
    hop_length = max(1, int(len(y) / (duration * FPS)))
    S = np.abs(librosa.stft(y, n_fft=512, hop_length=hop_length))
    S = S[:n_bars]
    maxes = S.max(axis=1)
    maxes[maxes == 0] = 1
    S = S / maxes[:, None]

    def make_frame(t):
        frame_idx = int((t / duration) * S.shape[1])
        img = np.zeros((height, width, 4), dtype=np.uint8)
        if frame_idx < S.shape[1]:
            spectrum = S[:, frame_idx]
        else:
            spectrum = S[:, -1]
        bar_width = int(width / n_bars)
        for i, s in enumerate(spectrum):
            bar_h = int(np.clip(s, 0, 1) * (height - 18))
            if bar_h <= 0:
                continue
            x1 = i * bar_width
            x2 = x1 + bar_width - 2
            y2 = height - 1
            alphas = (np.linspace(0, 255, bar_h)).astype(np.uint8)
            bar = np.zeros((bar_h, x2 - x1, 4), dtype=np.uint8)
            bar[:, :, :3] = bar_color(i)
            bar[:, :, 3] = alphas[:, None]
            y1 = y2 - bar_h + 1
            img[y1:y2 + 1, x1:x2, :] = bar
        return img

    clip = VideoClip(make_frame, duration=duration).with_fps(FPS)
    return clip.with_position(("center", H - height))

def make_shlageball_pulse_clip(audio_path, duration, center_img_path, min_scale=0.7, max_scale=0.9):
    y, sr = librosa.load(audio_path, sr=None)
    hop_length = int(sr/FPS)
    rms = librosa.feature.rms(y=y, hop_length=hop_length)[0]
    rms = rms / np.max(rms)
    times = np.linspace(0, duration, len(rms))
    img = Image.open(center_img_path).convert("RGBA")
    img_np = np.array(img)
    def make_frame(t):
        scale = min_scale + (max_scale - min_scale) * np.interp(t, times, rms)
        h = int(img_np.shape[0] * scale)
        w = int(img_np.shape[1] * scale)
        h = min(h, H)
        w = min(w, W)
        img_scaled = np.array(Image.fromarray(img_np).resize((w, h), Image.LANCZOS))
        frame = np.zeros((H, W, 4), dtype=np.uint8)
        x = W//2 - w//2
        y_ = H//2 - h//2
        x_src, y_src = 0, 0
        x_dest, y_dest = x, y_
        if x < 0:
            x_src = -x
            x_dest = 0
        if y_ < 0:
            y_src = -y_
            y_dest = 0
        x_end = min(x_dest + w - x_src, W)
        y_end = min(y_dest + h - y_src, H)
        w_crop = x_end - x_dest
        h_crop = y_end - y_dest
        if w_crop <= 0 or h_crop <= 0:
            return frame
        alpha = img_scaled[y_src:y_src+h_crop, x_src:x_src+w_crop, 3]/255.0
        for c in range(3):
            frame[y_dest:y_dest+h_crop, x_dest:x_dest+w_crop, c] = (
                frame[y_dest:y_dest+h_crop, x_dest:x_dest+w_crop, c] * (1-alpha)
                + img_scaled[y_src:y_src+h_crop, x_src:x_src+w_crop, c] * alpha
            ).astype(np.uint8)
        frame[y_dest:y_dest+h_crop, x_dest:x_dest+w_crop, 3] = (
            img_scaled[y_src:y_src+h_crop, x_src:x_src+w_crop, 3]
        )
        return frame
    return VideoClip(make_frame, duration=duration).with_fps(FPS)

def make_character_clip(image_path, duration, height_ratio=0.8):
    if not os.path.isfile(image_path):
        print(f"Image not found: {image_path}")
        return None
    clip = ImageClip(image_path).with_duration(duration)
    clip = clip.fx(video.fx.all.mirror_x)
    clip = clip.resized(height=int(H * height_ratio))
    return clip.with_position(("left", "center"))

def make_title_clip(text, duration, fontsize=110, color=TITLE_COLOR, y_offset=160):
    try:
        font = ImageFont.truetype(TITLE_FONT_PATH, fontsize)
    except Exception:
        font = ImageFont.load_default()
    img = Image.new("RGBA", (W, 200), (0,0,0,0))
    draw = ImageDraw.Draw(img)
    bbox = draw.textbbox((0,0), text, font=font)
    wtxt = bbox[2] - bbox[0]
    htxt = bbox[3] - bbox[1]
    x = (W - wtxt) // 2
    y = (200 - htxt) // 2
    draw.text(
        (x, y),
        text,
        font=font,
        fill=color,
        stroke_width=4,
        stroke_fill=TITLE_STROKE_COLOR,
    )
    clip = ImageClip(np.array(img)).with_duration(duration)
    clip = clip.with_position(("center", H//2 + y_offset))
    return clip

def make_logo_clip(duration, width=W // 2, y_offset=-130):
    clip = ImageClip(LOGO_PATH).with_duration(duration)
    clip = clip.resized(width=width)
    clip = clip.resized(lambda t: 0.99 + 0.007 * np.sin(2 * np.pi * t * 0.33))
    clip = clip.with_position(("center", y_offset))
    return clip

def safe_filename(name):
    return "".join(c if c.isalnum() or c in "-_" else "_" for c in name)

def main():
    data = load_music_data()
    musics = [m for m in data if m.get('url')]
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(TMP_DIR, exist_ok=True)
    for music in musics:
        outname = safe_filename(music["nom"])
        output_path = os.path.join(OUTPUT_DIR, f"{outname}.mp4")
        if os.path.isfile(output_path):
            print(f"Skipping {music['nom']}, video already exists.")
            continue

        audio_path = get_audio_wav_path(music)
        if not os.path.isfile(audio_path):
            print(f"Skipping {music['nom']}, WAV audio not found at {audio_path}")
            continue

        clip_audio = make_audio_clip(music)
        if not clip_audio:
            print(f"Skipping {music['nom']}, audio missing.")
            continue

        duration = clip_audio.duration
        bg_filename = f"{music.get('type', 'bg')}.png"
        bg_path = os.path.join(BG_IMG_DIR, bg_filename)
        if not os.path.isfile(bg_path):
            print(f"Background image not found: {bg_path}")
            continue
        bg_clip = ImageClip(bg_path).with_duration(duration).resized(width=W, height=H)
        spectrum_clip = make_audio_spectrum_clip(audio_path, duration)
        logo_clip = make_logo_clip(duration)
        title = f"{music['nom']}"
        title_clip = make_title_clip(title, duration)

        overlays = [bg_clip, logo_clip, spectrum_clip]
        if music.get('image'):
            character_path = get_public_full_path(music['image'])
            character_clip = make_character_clip(character_path, duration)
            if character_clip:
                overlays.append(character_clip)
        else:
            pulse_clip = make_shlageball_pulse_clip(
                audio_path,
                duration,
                CENTER_IMG_PATH,
                min_scale=0.35,
                max_scale=0.45,
            )
            overlays.append(pulse_clip)

        overlays.append(title_clip)
        final_video = CompositeVideoClip(overlays).with_audio(clip_audio)
        final_video = final_video.with_effects([vfx.FadeOut(1, final_color=(0, 0, 0))])

        print(f"Export de {output_path}...")
        temp_audio_path = os.path.join(TMP_DIR, f"{outname}_audio.m4a")
        final_video.write_videofile(
            output_path,
            fps=FPS,
            audio_codec='aac',
            audio_bitrate="320k",
            audio_fps=48000,
            temp_audiofile=temp_audio_path,
            remove_temp=True,
        )

if __name__ == "__main__":
    main()
