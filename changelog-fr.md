# Journal des modifications

Toutes les modifications importantes de ce projet seront documentées dans ce fichier.
Le format s'inspire de [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [Non publié]

## [0.3.2] - 2025-07-04

### Ajouté

- Système de personnages avec de nouveaux dresseurs (Caillou, Sachatte, Professeur Merdant, Marcon, Norman, Siphanus et Marine Lahaine).
- Indicateur de progression du combat et bulles d'aide pour la capture et la victoire.
- Refonte de l'onglet des succès avec sauvegarde des déblocages.
- Les statistiques des Shlagémons s'ajustent désormais selon le rang de la zone.
- Bonus d'attaque calculé à partir du Schlagedex accessible.
- Icône de capture affichée en combat sauvage pour les Shlagémons déjà obtenus.
- Nouvelles évolutions : Floripute et Barbebizarre.

### Modifié

- Utilisation du bonus Schlagedex pendant les combats.
- Style des succès modernisé.
- Les actions de zone sont déplacées dans le panneau du village.

### Corrigé

- Les PV sont conservés entre deux combats sauvages.
- Correction du débordement du panneau d'informations du joueur et autres bogues mineurs.
- Suppression des doublons lors du chargement du Schlagedex.
- Désérialisation sécurisée quand des données sont manquantes.
- Fusion des doublons après une évolution.
- La modale d'évolution ne s'affiche que lorsque l'évolution est possible.

## [0.3.1] - 2025-07-03

### Ajouté

- Composant d'info-bulle sur le panneau du joueur.
- Ajustement de la grille de jeu.

### Corrigé

- Possibilité de retenter un combat de dresseur après une défaite.
- Persistance de la progression de zone avec les rois vaincus.
- Alignement du panneau d'informations du joueur.
- Diverses corrections mineures.

## [0.3.0] - 2025-07-02

### Ajouté

- Amélioration UI et ergonomie
- Progression des zones avec combats de boss et rencontres spécifiques.
- Combats d'entraîneurs avec gestion de la vigueur et phases de changement.
- Système de capture cohérent
- Superposition de capture et mise en avant des "shiny".
- Probabilité d'un Shiny : 0.01%
- Affichage de l'efficacité en combat via une bulle de d'info.
- Ajout d'une dizaine de Shlagémons

### Corrigé

- Empêcher le débordement du panneau d'information du joueur avec des points de suspension.
- Pleins de bug corrigés, flemme de détailler

## [0.2.0] - 2025-06-30

### Ajouté

- Panneaux de boutique et d'inventaire avec actions sur les objets.
- Navigation entre les zones et zones basées sur le niveau.
- Notifications pour les nouveaux Shlagémon et les montées en rareté.

### Modifié

- Composant de modale amélioré avec des commandes de fermeture intégrées.

## [0.1.0] - 2025-06-27

### Ajouté

- Migration vers Vue 3 avec style UnoCSS et thème clair/sombre.
- Schlagedex avec statistiques des Shlagémon et grille adaptative.
- Persistance de l'état du jeu dans le stockage local.
