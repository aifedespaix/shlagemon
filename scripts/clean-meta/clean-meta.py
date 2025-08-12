import os
import subprocess

# Dossier contenant les .ogg
sfx_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../public/audio/sfx'))

# Parcourt récursivement tous les sous-dossiers et fichiers
for root, _, files in os.walk(sfx_dir):
    for filename in files:
        if filename.lower().endswith('.ogg'):
            input_path = os.path.join(root, filename)
            temp_path = os.path.join(root, f"temp_{filename}")

            # Commande ffmpeg pour copier l'audio sans métadonnées
            cmd = [
                'ffmpeg',
                '-i', input_path,
                '-map_metadata', '-1',  # supprime les métadonnées
                '-c:a', 'copy',         # copie le flux audio sans le réencoder
                temp_path
            ]

            print(f"Traitement de {input_path}...")

            try:
                subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                os.replace(temp_path, input_path)  # remplace l'ancien fichier par le nouveau
            except subprocess.CalledProcessError:
                print(f"Erreur avec le fichier {input_path}")
            except Exception as e:
                print(f"Erreur : {e}")
