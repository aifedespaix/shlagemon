from svgpathtools import svg2paths, wsvg
import os

def clean_svg(input_svg, output_svg, min_length=20):
    paths, attributes = svg2paths(input_svg)
    cleaned_paths = []
    cleaned_attributes = []
    for path, attr in zip(paths, attributes):
        if path.length() >= min_length:
            cleaned_paths.append(path)
            cleaned_attributes.append(attr)
    if cleaned_paths:
        wsvg(cleaned_paths, attributes=cleaned_attributes, filename=output_svg)
        print(f"✅ SVG nettoyé : {output_svg}")
    else:
        print(f"⚠️ Aucun chemin conservé pour {input_svg} (SVG inchangé)")

# Exemple d'utilisation sur un dossier
import glob
for svgfile in glob.glob('./stylised-shlagemons/*.svg'):
    clean_svg(svgfile, svgfile)
