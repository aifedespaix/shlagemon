## 📌 **Guide Complet : Organisation Avancée des Traductions Vue avec vue-i18n (TypeScript)**

### 📂 **1. Structure recommandée du projet :**

Organisez les fichiers de traduction au plus près des composants, stores et données pour faciliter la maintenance :

```
src/
├── components/
│   ├── PlayerCard.vue
│   ├── PlayerCard.i18n.yml
│   ├── ScoreBoard.vue
│   └── ScoreBoard.i18n.yml
├── stores/
│   ├── playerStore.ts
│   └── playerStore.i18n.yml
├── data/
│   └── levels/
│       ├── level1.ts
│       └── level1.i18n.yml
├── locales/ (généré automatiquement)
│   ├── fr.yml
│   └── en.yml
└── scripts/
    └── merge-i18n.cjs
```

---

### 🌐 **2. Conventions pour les clés de traduction :**

Chaque fichier YAML aura une clé racine correspondant au nom exact du fichier associé en camelCase :

**Exemple :** `PlayerCard.i18n.yml`

```yaml
playerCard:
  title: Joueur
  points: '{n} point | {n} points'
```

**Exemple pour store :** `playerStore.i18n.yml`

```yaml
playerStore:
  welcomeMessage: 'Bienvenue, {playerName}!'
```

**Exemple pour data :** `level1.i18n.yml`

```yaml
levels:
  level1:
    name: Niveau 1
    description: Introduction au jeu.
```

---

### 🚩 **3. Techniques avancées de traduction :**

#### a. Pluriels :

```yaml
points: 'aucun point | {n} point | {n} points'
```

Usage :

```vue
{{ $t('playerCard.points', n) }}
```

#### b. Masculin/Féminin (sélection conditionnelle) :

```yaml
invited:
  male: '{name} a été invité.'
  female: '{name} a été invitée.'
```

Usage :

```vue
{{ $t(`playerCard.invited.${gender}`, { name }) }}
```

#### c. Formattage conditionnel avancé (plural + genre) :

```yaml
playerWin: |
  {gender, select,
    male {Le joueur {name} a gagné {points, plural, one {# point} other {# points}}.}
    female {La joueuse {name} a gagné {points, plural, one {# point} other {# points}}.}
    other {La personne {name} a gagné {points, plural, one {# point} other {# points}}.}
  }
```

Usage :

```vue
{{ $t('playerCard.playerWin', { gender: 'male', name: 'Alex', points: 3 }) }}
```

---

### ⚙️ **4. Script de Merge Automatisé (CommonJS pour Node avec PNPM) :**

Utilisez un fichier `.cjs` pour gérer l'import avec Node via PNPM.

`merge-i18n.cjs` :

```js
const fs = require('node:fs')
const glob = require('glob')
const yaml = require('js-yaml')

const languages = ['fr', 'en']

languages.forEach((lang) => {
  const mergedTranslations = {}

  glob.sync(`./src/{components,stores,data}/**/*.i18n.yml`).forEach((file) => {
    const content = yaml.load(fs.readFileSync(file, 'utf8'))
    Object.assign(mergedTranslations, content)
  })

  fs.writeFileSync(`./locales/${lang}.yml`, yaml.dump(mergedTranslations))
})
```

Exécutez le script manuellement avec PNPM :

```sh
pnpm run i18n
```

---

### ⚡ **5. Configuration de vue-i18n :**

Configuration initiale (`main.ts` ou similaire) :

```typescript
import { createI18n } from 'vue-i18n'
import en from './locales/en.yml'
import fr from './locales/fr.yml'

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages: { fr, en }
})

export default i18n
```

Utilisation dans Vue :

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <h1>{{ t('playerCard.title') }}</h1>
</template>
```

---

### 📖 **6. Avantages de cette approche :**

- Modularité : Maintenance facile, chaque composant, store, ou donnée est indépendant.
- Automatisation : Pas d’intervention manuelle nécessaire.
- Performance : Facilité d'optimisation par lazy loading.
- Scalabilité : Adaptée à des projets complexes avec traductions conditionnelles.

---

**Cette structure complète assure une gestion efficace, claire et performante de vos traductions avec Vue, TypeScript et vue-i18n.**
