#!/usr/bin/env python3
import os, yaml
base_dirs=['src/components','src/stores','src/data']
for base in base_dirs:
    if not os.path.isdir(base):
        continue
    for root, _, files in os.walk(base):
        for f in files:
            if not f.endswith('.i18n.yml'):
                continue
            path=os.path.join(root,f)
            data=yaml.safe_load(open(path))
            key=list(data.keys())[0]
            fr=data[key].get('fr')
            if not fr or data[key].get('en'):
                continue
            data[key]['en']={k:v for k,v in fr.items() if isinstance(v,str)}
            with open(path,'w') as fw:
                yaml.dump(data, fw, allow_unicode=True, width=float('inf'))
            print('Copied FR to EN for',path)
