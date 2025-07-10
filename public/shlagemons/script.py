from pathlib import Path
from PIL import Image

base_path = Path('.')  # Dossier courant

for image_path in base_path.rglob("*"):
    if image_path.suffix.lower() in [".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif"]:
        try:
            with Image.open(image_path) as img:
                if img.size != (1024, 1024):
                    print(f"{image_path} -> {img.size}")
        except Exception as e:
            print(f"Erreur avec {image_path} : {e}")
