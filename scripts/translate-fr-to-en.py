#!/usr/bin/env python3
import os
import yaml
import argostranslate.package
import argostranslate.translate

langs = argostranslate.translate.get_installed_languages()
fr = next(l for l in langs if l.code == 'fr')
en = next(l for l in langs if l.code == 'en')
translate = fr.get_translation(en).translate

base_dirs = ['src/components', 'src/stores', 'src/data']

for base in base_dirs:
    if not os.path.isdir(base):
        continue
    for root, _, files in os.walk(base):
        for file in files:
            if not file.endswith('.i18n.yml'):
                continue
            path = os.path.join(root, file)
            data = yaml.safe_load(open(path))
            key = next(iter(data))
            fr_data = data[key].get('fr')
            if not fr_data or data[key].get('en'):
                continue
            en_trans = {}
            for k, v in fr_data.items():
                if isinstance(v, str):
                    en_trans[k] = translate(v)
            data[key]['en'] = en_trans
            with open(path, 'w') as f:
                yaml.dump(data, f, allow_unicode=True, width=float('inf'))
            print('Updated', path)

