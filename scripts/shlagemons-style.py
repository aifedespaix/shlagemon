import os
import glob
import subprocess
from PIL import Image, ImageOps, ImageChops
import numpy as np
import cv2
from sklearn.cluster import KMeans
from scipy.ndimage import binary_dilation

IN_ROOT = '../public/shlagemons'
OUT_ROOT = './stylised-shlagemons'
OUTLINE_WIDTH = 10
INNER_WIDTH = 3
CANNY_MIN = 40
CANNY_MAX = 120
SHADOW_OFFSET = (14, 14)  # Décalage directionnel (X, Y)
SHADOW_EXTRA = 12         # Largeur d'ombre (dilate plus ou moins l'extérieur)
SHADOW_ALPHA = 255        # Opacité de l’ombre (255 = opaque)

def get_major_color(img):
    arr = np.array(img)
    alpha = arr[..., 3]
    mask = alpha > 10
    colors = arr[mask][:, :3]
    if len(colors) == 0:
        return (255, 255, 255, 255)
    kmeans = KMeans(n_clusters=2, n_init=4)
    labels = kmeans.fit_predict(colors)
    counts = np.bincount(labels)
    dominant = kmeans.cluster_centers_[counts.argmax()].astype(int)
    return tuple(list(dominant) + [255])

def stylise_image(in_path, out_path):
    im = Image.open(in_path).convert("RGBA")
    color = get_major_color(im)

    alpha = np.array(im.split()[-1])
    mask = (alpha > 10).astype(np.uint8) * 255

    # 1. Contour externe (noir)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    outline_canvas = np.zeros((im.height, im.width, 4), dtype=np.uint8)
    cv2.drawContours(outline_canvas, contours, -1, (0,0,0,255), OUTLINE_WIDTH)
    outline_img = Image.fromarray(outline_canvas, mode="RGBA")

    # 2. Ombre extérieure pure, couleur dominante, pas d’overlay sur l’intérieur
    mask_pil = Image.fromarray(mask, mode="L")
    # Dilate le masque pour obtenir une silhouette plus large
    mask_ext = (mask > 0)
    structure = np.ones((OUTLINE_WIDTH + SHADOW_EXTRA, OUTLINE_WIDTH + SHADOW_EXTRA), dtype=bool)
    mask_dilated = binary_dilation(mask_ext, structure=structure).astype(np.uint8) * 255
    mask_dilated_img = Image.fromarray(mask_dilated, mode="L")
    # Anneau externe seulement
    mask_ring_img = ImageChops.subtract(mask_dilated_img, mask_pil)

    # Création de l'image ombre RGBA (couleur majoritaire, opaque, que sur l'anneau extérieur)
    shadow_rgba = np.zeros((im.height, im.width, 4), dtype=np.uint8)
    shadow_rgba[..., 0] = color[0]
    shadow_rgba[..., 1] = color[1]
    shadow_rgba[..., 2] = color[2]
    shadow_rgba[..., 3] = np.array(mask_ring_img) // 255 * SHADOW_ALPHA  # masque binaire (0 ou 255) * alpha

    shadow_img = Image.fromarray(shadow_rgba, mode="RGBA")
    # Décale l’ombre dans l’image finale
    ombre = Image.new("RGBA", im.size, (0,0,0,0))
    ombre.paste(shadow_img, SHADOW_OFFSET)

    # 3. Traits internes : Canny puis couleur dominante, en retirant le contour externe
    img_gray = im.convert("L")
    arr_gray = np.array(img_gray)
    arr_gray[alpha < 10] = 255

    edges = cv2.Canny(arr_gray, CANNY_MIN, CANNY_MAX)
    contour_mask = np.zeros_like(edges)
    cv2.drawContours(contour_mask, contours, -1, 255, OUTLINE_WIDTH + 2)
    edges_internal = np.where((edges > 0) & (contour_mask == 0), 255, 0).astype(np.uint8)
    edges_internal = cv2.dilate(edges_internal, np.ones((INNER_WIDTH, INNER_WIDTH), np.uint8))
    internes_rgba = np.zeros((im.height, im.width, 4), dtype=np.uint8)
    internes_rgba[..., 0] = color[0]
    internes_rgba[..., 1] = color[1]
    internes_rgba[..., 2] = color[2]
    internes_rgba[..., 3] = edges_internal
    internes_img = Image.fromarray(internes_rgba, mode="RGBA")

    # 4. Fusion finale
    final = Image.new("RGBA", im.size, (0,0,0,0))
    final = Image.alpha_composite(final, ombre)
    final = Image.alpha_composite(final, outline_img)
    final = Image.alpha_composite(final, internes_img)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    final.save(out_path)
    print(f"✅ Stylised: {out_path}")

def vectorize_png(png_path):
    svg_path = png_path.replace('.png', '.svg')
    INKSCAPE_PATH = 'inkscape'
    actions = 'EditSelectAll;SelectionTraceBitmap;SelectionSimplify;SelectionSimplify;SelectionSimplify;SelectionSimplify;FileSave;FileClose;'
    try:
        result = subprocess.run(
            [
                INKSCAPE_PATH,
                png_path,
                f'--export-filename={svg_path}',
                f'--actions={actions}'
            ],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            print(f"✅ Vectorized & Smooth: {svg_path}")
        else:
            print(f"❌ Erreur vectorisation: {png_path}")
            print("STDOUT:", result.stdout)
            print("STDERR:", result.stderr)
    except FileNotFoundError:
        print(f"❌ inkscape introuvable ! Chemin essayé : {INKSCAPE_PATH}")

def process_all():
    files = glob.glob(os.path.join(IN_ROOT, '**/*.png'), recursive=True)
    print(f"{len(files)} images à traiter…")
    for in_path in files:
        filename = os.path.basename(in_path)
        out_path = os.path.join(OUT_ROOT, filename)
        stylise_image(in_path, out_path)
        # vectorize_png(out_path)  # Décommente pour lancer la vectorisation SVG !
        # break  # Enlève pour traiter toutes les images

if __name__ == "__main__":
    process_all()
