# Shlagémon

![Logo](public/logo.png)

Plongez dans un univers délirant peuplé de Shlagémons totalement barrés. Capturez-les, faites-les combattre et remplissez votre Schlagedex pour devenir le dresseur ultime et rafler les précieux _Shlagidolar_. Le projet utilise les dernières versions de **Vue&nbsp;3** et suit les meilleures pratiques de la doc officielle pour une expérience fluide, que ce soit sur mobile ou sur grand écran.

![Carapouffe](public/shlagemons/carapouffe/carapouffe.png)
![Sachatte](public/characters/sachatte/sachatte.png)
![Prof Merdant](public/characters/prof-merdant/prof-merdant.png)

## Concept

Chaque Shlagémon dispose de statistiques qui lui sont propres et appartient à une poignée de types complètement improbables. Une interface minimaliste vous permet de choisir votre compagnon, de consulter le _Schlagedex_ et de lancer des combats acharnés.
Un mini-jeu d'adresse « Whack-a-Shlag » permet aussi de récolter quelques Shlagidolars.

## Fonctionnalités clés

- **Vue&nbsp;3 + Vite + TypeScript** pour un développement moderne et rapide.
- **Pinia** pour la gestion d'état, organisée en plusieurs stores pour une meilleure maintenabilité.
- **UnoCSS** comme moteur de styles, avec la syntaxe _attributify_ (par ex. `md="px-4"`) pour un design mobile first et un responsive clair.
- Thèmes **clair** et **sombre** via les classes `dark:` (ex. `dark:bg-gray-800`).
- Composants découpés en unités réutilisables (boutons, cartes, panneaux...).
- Routing basé sur les fichiers et génération statique grâce à `vite-ssg`.
- Prêt pour le _PWA_ et l'internationalisation.
- Mini-jeu « Whack-a-Shlag » accessible depuis le village Veaux du Gland.

## Installation

1. Clonez ce dépôt.
2. Installez les dépendances :
   ```bash
   pnpm install
   ```
   Vous pouvez aussi lancer le script `./scripts/setup.sh` pour préparer l'environnement.

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

> Avant d'exécuter `pnpm lint` ou `pnpm test:*`, assurez-vous d'avoir installé les dépendances avec `pnpm install`.

- Tests unitaires : `pnpm test:unit`
- Tests end‑to‑end : `pnpm test:e2e`

Depuis le jeu, rendez-vous au village **Veaux du Gland sur Marne** et cliquez sur « Mini-jeu » pour lancer une partie de Whack-a-Shlag.

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

Le style par défaut vise les écrans mobiles. Les variantes `sm:`, `md:`, `lg:` etc. ajustent l'affichage pour les résolutions supérieures. Pour des besoins spécifiques, on peut ajouter du CSS interne aux composants.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une _issue_ ou une _pull request_ pour signaler un bug ou proposer une amélioration.

## Licence

Ce projet est distribué sous licence [MIT](LICENSE).
