# Shlagémon

**Shlagémon** est une petite application web parodiant l'univers de Pokémon. Vous y capturez des créatures loufoques et les faites s'affronter pour gagner des _Shlagidolar_.
Le projet est bâti avec les dernières versions de **Vue&nbsp;3** et suit les bonnes pratiques recommandées dans la documentation officielle.

## Concept

Le jeu reprend le principe du célèbre RPG de monstres à collectionner. Chaque "Shlagémon" possède ses propres statistiques et un type parmi une poignée de catégories décalées.
Une interface minimaliste permet de choisir son compagnon, de consulter le _Schlagedex_ et de lancer des combats.

## Fonctionnalités clés

- **Vue&nbsp;3 + Vite + TypeScript** pour un développement moderne et rapide.
- **Pinia** pour la gestion d'état, organisée en plusieurs stores pour une meilleure maintenabilité.
- **UnoCSS** comme moteur de styles, avec la syntaxe _attributify_ (par ex. `md="px-4"`) pour un design mobile first et un responsive clair.
- Thèmes **clair** et **sombre** via les classes `dark:` (ex. `dark:bg-gray-800`).
- Composants découpés en unités réutilisables (boutons, cartes, panneaux...).
- Routing basé sur les fichiers et génération statique grâce à `vite-ssg`.
- Prêt pour le _PWA_ et l'internationalisation.

## Installation

1. Clonez ce dépôt.
2. Installez les dépendances :
   ```bash
   pnpm install
   ```

## Utilisation

### Lancement en développement

```bash
pnpm dev
```

Ouvrez <http://localhost:3333> pour voir l'application.

### Construction pour la production

```bash
pnpm build
```

Les fichiers prêts à être servis se trouvent dans le dossier `dist`.

### Tests

- Tests unitaires : `pnpm test:unit`
- Tests end‑to‑end : `pnpm test:e2e`

## Structure du projet

```
├─ public/            # ressources statiques (images, icônes...)
├─ src/
│  ├─ components/     # petits composants réutilisables
│  ├─ layouts/        # structures de pages
│  ├─ pages/          # routage automatique
│  ├─ stores/         # Pinia
│  └─ ...
└─ uno.config.ts      # configuration d'UnoCSS
```

Le style par défaut vise les écrans mobiles. Les variantes `sm:`, `md:`, `lg:` etc. ajustent l'affichage pour les résolutions supérieures.
Pour des besoins spécifiques, on peut ajouter du CSS interne aux composants.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une _issue_ ou une _pull request_ pour signaler un bug ou proposer une amélioration.

## Licence

Ce projet est distribué sous licence [MIT](LICENSE).
