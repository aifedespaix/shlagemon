import json
import os
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
)

# --- CONFIG ---
MUSIC_DATA_PATH = '../public/music-data.json'
BASE_AUDIO_PATH = '../public'
CENTER_IMG_PATH = '../public/items/shlageball/shlageball.png'
BG_IMG_PATH = './clip/bg.png'
# Couleur principale de l'application (teal WPA)
BASE_COLOR = (13, 148, 136)
W, H = 1920, 1080
FPS = 30

def load_music_data():
    with open(MUSIC_DATA_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_audio_full_path(url):
    return os.path.join(BASE_AUDIO_PATH, url.strip("/"))

def decide_loops(audio_path):
    y, sr = librosa.load(audio_path, sr=None)
    duration = librosa.get_duration(y=y, sr=sr)
    if duration > 120:
        return 1
    elif duration > 60:
        return 1
    elif duration < 30:
        return 3
    else:
        return 2

def make_audio_clip(music):
    if not music['url']:
        return None
    path = get_audio_full_path(music['url'])
    if not os.path.isfile(path):
        print(f"File not found: {path}")
        return None
    loops = decide_loops(path)
    clip = AudioFileClip(path)
    return concatenate_audioclips([clip] * loops)

def make_audio_spectrum_clip(audio_path, duration, width=W, height=180, n_bars=64):
    """Create an audio spectrum clip with transparent background.

    Bars use the application's main color with a vertical gradient
    fading to transparent towards the top.
    """
    def bar_color(_i):
        # all bars share the same base color
        return BASE_COLOR
    import librosa
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
            # gradient alpha from top (0) to bottom (255)
            alphas = (np.linspace(0, 255, bar_h)).astype(np.uint8)
            bar = np.zeros((bar_h, x2 - x1, 4), dtype=np.uint8)
            bar[:, :, :3] = bar_color(i)
            # repeat the alpha gradient across the bar width
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

def make_title_clip(text, duration, fontsize=90, color="white", y_offset=160):
    # Police système basique (arial), tu peux changer le chemin vers un .ttf si tu veux
    try:
        font = ImageFont.truetype("arial.ttf", fontsize)
    except:
        font = ImageFont.load_default()
    
    # Taille image
    img = Image.new("RGBA", (W, 200), (0,0,0,0))
    draw = ImageDraw.Draw(img)
    
    # Mesure le texte et centre
    bbox = draw.textbbox((0,0), text, font=font)
    wtxt = bbox[2] - bbox[0]
    htxt = bbox[3] - bbox[1]
    x = (W - wtxt) // 2
    y = (200 - htxt) // 2
    
    # Ombre noire
    draw.text((x+4, y+4), text, font=font, fill="black")
    # Texte blanc
    draw.text((x, y), text, font=font, fill=color)
    
    # Convertit en clip MoviePy (colle sous la HB)
    clip = ImageClip(np.array(img)).with_duration(duration)
    clip = clip.with_position(("center", H//2 + y_offset))
    return clip


def safe_filename(name):
    return "".join(c if c.isalnum() or c in "-_" else "_" for c in name)

def main():
    data = load_music_data()
    musics = [m for m in data if m.get('url')]
    for music in musics:
        clip_audio = make_audio_clip(music)
        if not clip_audio:
            print(f"Skipping {music['nom']}, audio missing.")
            continue
        duration = clip_audio.duration
        bg_clip = ImageClip(BG_IMG_PATH).with_duration(duration).resized(width=W, height=H)
        spectrum_clip = make_audio_spectrum_clip(get_audio_full_path(music['url']), duration)
        pulse_clip = make_shlageball_pulse_clip(get_audio_full_path(music['url']), duration, CENTER_IMG_PATH)
        title = f"{music['nom']}"
        title_clip = make_title_clip(title, duration)
        final_video = CompositeVideoClip([bg_clip, spectrum_clip, pulse_clip, title_clip]).with_audio(clip_audio)
        outname = safe_filename(music["nom"])
        output_path = f"./output_{outname}.mp4"
        print(f"Export de {output_path}...")
        final_video.write_videofile(output_path, fps=FPS, audio_codec='aac')

if __name__ == "__main__":
    main()
