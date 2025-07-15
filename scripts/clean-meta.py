import os
import subprocess

# Dossier contenant les .ogg
sfx_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../public/audio/sfx'))

# Parcourt tous les fichiers dans le dossier
for filename in os.listdir(sfx_dir):
    if filename.lower().endswith('.ogg'):
        input_path = os.path.join(sfx_dir, filename)
        temp_path = os.path.join(sfx_dir, f"temp_{filename}")

        # Commande ffmpeg pour copier l'audio sans métadonnées
        cmd = [
            'ffmpeg',
            '-i', input_path,
            '-map_metadata', '-1',  # supprime les métadonnées
            '-c:a', 'copy',         # copie le flux audio sans le réencoder
            temp_path
        ]

        print(f"Traitement de {filename}...")

        try:
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            os.replace(temp_path, input_path)  # remplace l'ancien fichier par le nouveau
        except subprocess.CalledProcessError:
            print(f"Erreur avec le fichier {filename}")
        except Exception as e:
            print(f"Erreur : {e}")
