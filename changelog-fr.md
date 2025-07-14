# Journal des modifications

Toutes les modifications importantes de ce projet seront documentées dans ce fichier.
Le format s'inspire de [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [0.3.4] - 2025-07-06

### Ajouté

- Système de maladies pour les Shlagémons avec badges en combat.
- Gestion des objets tenus par les Shlagémons.

### Modifié

- Boutons du menu mobile améliorés et désactivés lors de l'ouverture d'une fenêtre de dialogue.

### Corrigé

- Les minuteries de combat sont correctement réinitialisées.
- Petits correctifs d'interface et de configuration.

## [0.3.3] - 2025-07-05

### Ajouté

- Formulaire de création de joueur avec persistance des préférences audio.
- Bouton des paramètres sonores déplacé dans l'en-tête et pistes musicales aléatoires.
- Pierre d'évolution et minuteries de potions améliorées.
- Composant `SearchInput` pour filtrer le Shlagedex avec nouveaux tris.
- Bouton de défi du roi en combat et info-bulle lorsque l'on n'a plus de Shlagéballs.
- Possibilité de relâcher un Shlagémon depuis le Shlagedex.

### Modifié

- Zones colorées selon le niveau et curseur épée au survol en combat.
- Capture désactivée quand l'ennemi est K.O.
- Initialisation de Pinia avant les autres modules.

### Corrigé

- Double clic fonctionnel dans le Shlagedex et divers correctifs d'interface.
- Correction de crashs lors des combats de dresseurs ou de rois.
- Ajustements du panneau d'information du joueur.

## [0.3.2] - 2025-07-04

### Ajouté

- Système de personnages avec de nouveaux dresseurs (Caillou, Sachatte, Professeur Merdant, Marcon, Norman, Siphanus et Marine Lahaine).
- Indicateur de progression du combat et bulles d'aide pour la capture et la victoire.
- Refonte de l'onglet des succès avec sauvegarde des déblocages.
- Les statistiques des Shlagémons s'ajustent désormais selon le rang de la zone.
- Bonus d'attaque calculé à partir du Shlagedex accessible.
- Icône de capture affichée en combat sauvage pour les Shlagémons déjà obtenus.
- Nouvelles évolutions : Floripute et Barbebizarre.

### Modifié

- Utilisation du bonus Shlagedex pendant les combats.
- Style des succès modernisé.
- Les actions de zone sont déplacées dans le panneau du village.

### Corrigé

- Les PV sont conservés entre deux combats sauvages.
- Correction du débordement du panneau d'informations du joueur et autres bogues mineurs.
- Suppression des doublons lors du chargement du Shlagedex.
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
- Shlagedex avec statistiques des Shlagémon et grille adaptative.
- Persistance de l'état du jeu dans le stockage local.
