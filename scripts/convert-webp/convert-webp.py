#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
from io import BytesIO
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from PIL import Image, ImageOps

# Optionnel : AVIF si pillow-avif-plugin est installé
import pillow_avif  # noqa: F401
AVIF_AVAILABLE = True
# try:
#     AVIF_AVAILABLE = True
# except Exception:
#     AVIF_AVAILABLE = False
# print(f"AVIF support: {'oui' if AVIF_AVAILABLE else 'non'}")

ALLOWED_DIRS = [
    "shlagemons",
    # "items",
    # "icons",
    # "characters",
]

    

def save_to_bytes(img: Image.Image, fmt: str, **kwargs) -> bytes:
    buf = BytesIO()
    img.save(buf, fmt, **kwargs)
    return buf.getvalue()


def try_webp_variants(img: Image.Image, quality_lossy: int) -> Tuple[bytes, bool]:
    """Retourne (bytes, used_lossless). Choisit entre lossy et lossless le plus petit."""
    lossy = save_to_bytes(img, "WEBP", quality=quality_lossy, method=6)
    lossless = save_to_bytes(img, "WEBP", lossless=True, method=6)
    return (lossless, True) if len(lossless) < len(lossy) else (lossy, False)


def try_avif(img: Image.Image, quality_lossy: int) -> Optional[bytes]:
    if not AVIF_AVAILABLE:
        return None
    try:
        # quality ~ 28–45 souvent bien; speed=6 (lent mais efficace)
        return save_to_bytes(img, "AVIF", quality=quality_lossy, speed=6)
    except Exception:
        return None


def is_flat_art(img: Image.Image, threshold_colors: int = 4096) -> bool:
    """Heuristique: peu de couleurs -> probablement UI/flat -> quantize utile."""
    sample = img.convert("RGBA").copy()
    sample.thumbnail((256, 256))
    colors = sample.convert("RGB").getcolors(maxcolors=1_000_000)
    return (colors is not None) and (len(colors) <= threshold_colors)


def quantize_if_flat(img: Image.Image, colors: int = 256) -> Image.Image:
    """Quantize RGB en conservant l'alpha si présent."""
    if img.mode not in ("RGBA", "LA"):
        return img.quantize(colors=colors, method=Image.FASTOCTREE).convert("RGB")
    alpha = img.getchannel("A")
    rgb = img.convert("RGB").quantize(colors=colors, method=Image.FASTOCTREE).convert("RGB")
    out = Image.merge("RGBA", (*rgb.split(), alpha))
    return out


def resize_contain(img: Image.Image, max_w: Optional[int], max_h: Optional[int]) -> Image.Image:
    """Réduit l'image sans upscaler, en conservant le ratio."""
    if not max_w and not max_h:
        return img.copy()
    target = (max_w or 10_000, max_h or 10_000)
    out = img.copy()
    # Pillow 11.3.0: reducing_gap dispo sur thumbnail()
    try:
        out.thumbnail(target, Image.LANCZOS, reducing_gap=3.0)
    except TypeError:
        out.thumbnail(target, Image.LANCZOS)
    return out


def build_scales(scales_str: str) -> List[float]:
    return [float(s.strip()) for s in scales_str.split(",") if s.strip()]


def ensure_rgb_or_rgba(img: Image.Image) -> Image.Image:
    return img.convert("RGBA") if img.mode in ("RGBA", "LA", "P") else img.convert("RGB")


def generate_variants(
    base: Image.Image,
    scales: List[float],
    q_lossy: int,
    both_formats: bool,
) -> List[Tuple[Image.Image, Dict[str, bytes], bool]]:
    """
    Retourne une liste de tuples:
      (image_redimensionnée, {'.webp': bytes, '.avif': bytes?}, used_lossless_webp)
    """
    out: List[Tuple[Image.Image, Dict[str, bytes], bool]] = []
    for scale in scales:
        w = int(base.width * scale)
        h = int(base.height * scale)
        if w < 1 or h < 1:
            continue
        sized = base if abs(scale - 1.0) < 1e-6 else base.resize((w, h), Image.LANCZOS)

        # WebP : choisit auto lossless vs lossy
        webp_bytes, used_lossless = try_webp_variants(sized, quality_lossy=q_lossy)

        # AVIF éventuel
        avif_bytes = try_avif(sized, quality_lossy=max(28, q_lossy - 15))

        if both_formats:
            out_map: Dict[str, bytes] = {".webp": webp_bytes}
            if avif_bytes:
                out_map[".avif"] = avif_bytes
        else:
            # Best-only: choisit le plus petit existant
            best_ext = ".webp"
            best_bytes = webp_bytes
            if avif_bytes and len(avif_bytes) < len(best_bytes):
                best_ext = ".avif"
                best_bytes = avif_bytes
            out_map = {best_ext: best_bytes}

        out.append((sized, out_map, used_lossless))
    return out


def main():
    parser = argparse.ArgumentParser(
        description="Optimise PNG en AVIF/WebP, multi-tailles, resize, quantize (compatible <picture/srcset>)."
    )
    parser.add_argument("--force", "-f", action="store_true", help="Force la reconversion")
    parser.add_argument("--max-width", type=int, default=2048, help="Largeur max (contain)")
    parser.add_argument("--max-height", type=int, default=None, help="Hauteur max (contain)")
    parser.add_argument("--quality", "-q", type=int, default=60, help="Qualité lossy WebP/AVIF (photos)")
    parser.add_argument(
        "--scales", type=str, default="1,0.5",
        help="Échelles séparées par des virgules (ex: 1,0.5,0.25). 1 = taille de base"
    )
    parser.add_argument(
        "--best-only", action="store_true",
        help="Écrit un seul meilleur format par taille (sinon AVIF+WebP si possible)"
    )
    parser.add_argument(
        "--root", type=str, default=None,
        help="Chemin racine des images sources (par défaut: <repo>/public)"
    )
    args = parser.parse_args()

    # Racine
    root = Path(args.root) if args.root else Path(__file__).resolve().parents[2] / "public"
    if not root.exists():
        raise SystemExit(f"[!] Dossier introuvable: {root}")

    scales = build_scales(args.scales)

    for src_path in root.rglob("*.png"):
        # On garde uniquement si le chemin contient un des dossiers autorisés
        if not any(f"/{allowed}/" in str(src_path).replace("\\", "/") for allowed in ALLOWED_DIRS):
            continue
        try:
            # Charge + normalise le mode
            img = ensure_rgb_or_rgba(Image.open(src_path))

            # Redimension de base (max-width/height)
            base = resize_contain(img, args.max_width, args.max_height)

            # Quantize si flat/illustration
            if is_flat_art(base):
                base = quantize_if_flat(base, colors=256)

            # Génère variantes
            variants = generate_variants(base, scales, args.quality, both_formats=not args.best_only)

            # Construction des chemins de sortie
            stem = src_path.with_suffix("").name
            out_base = src_path.parent / stem
            base_size_after = resize_contain(img, args.max_width, args.max_height).size  # pour détecter suffix 1x

            for sized, out_map, used_lossless in variants:
                suffix = "" if sized.size == base_size_after else f"-w{sized.width}"
                for ext, blob in out_map.items():
                    out_path = Path(f"{out_base}{suffix}{ext}")
                    if out_path.exists() and not args.force:
                        continue
                    out_path.write_bytes(blob)
                    mode = "lossless" if (ext == ".webp" and used_lossless) else "lossy"
                    kb = len(blob) / 1024
                    rel_in = src_path.relative_to(root)
                    rel_out = out_path.relative_to(root)
                    print(f"→ {rel_in} -> {rel_out}  {sized.width}x{sized.height}  [{ext[1:].upper()} {mode}]  {kb:.0f} KB")

        except Exception as e:
            rel = src_path.relative_to(root) if src_path.is_absolute() else src_path
            print(f"[ERREUR] {rel}: {e}")


if __name__ == "__main__":
    main()
