from pathlib import Path
from PIL import Image

# Chemin vers le dossier à traiter (depuis ./scripts)
target_path = Path(__file__).resolve().parent.parent / "public" / "shlagemons"

for png_path in target_path.rglob("*.png"):
    webp_path = png_path.with_suffix('.webp')

    # Ne pas reconvertir si le fichier .webp existe déjà
    if webp_path.exists():
        print(f"Déjà converti : {webp_path.relative_to(target_path)}")
        continue

    try:
        with Image.open(png_path) as img:
            img = img.convert("RGBA") if img.mode in ("RGBA", "P") else img.convert("RGB")
            img.save(webp_path, "WEBP", quality=80, method=6)
            print(f"Converti : {png_path.relative_to(target_path)} → {webp_path.relative_to(target_path)}")
    except Exception as e:
        print(f"Erreur avec {png_path.relative_to(target_path)} : {e}")
