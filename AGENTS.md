# Guidelines & AGENTS Manifest

This repository is a high-standard Vue 3 project, bootstrapped with Vite, written in strictly-typed TypeScript, and managed with **pnpm**.
Styling leverages **UnoCSS** (preset-wind and attributify), with full support for light/dark themes and responsive, modern UI/UX.
State management uses **Pinia**, and advanced reactivity is handled via **VueUse** composables.
All composables, stores, VueUse utilities, and components are auto-imported thanks to `unplugin-auto-import` and `unplugin-vue-components`, with the `directoryAsNamespace` convention for components.

---

## 🚀 Local Development

- **Install dependencies**
  ```bash
  pnpm install
  ```
- **Start the dev server**
  ```bash
  pnpm dev
  ```
  App runs at <http://localhost:3333>
- **Build for production**
  ```bash
  pnpm build
  ```

---

## 🧪 Testing

- **Unit tests (Vitest)**
  ```bash
  pnpm test:unit
  ```
- **End-to-end tests (Cypress)**
  ```bash
  pnpm test:e2e
  ```
- **All tests**
  ```bash
  pnpm test
  ```
- **Other scripts:**
  See `package.json` for `lint`, `typecheck`, `deploy`, etc.

---

## 📁 Project Structure

- `src/components/` – UI components (atomic, reusable, no "Ui" prefix, see [Naming](#component-naming))
- `src/composables/` – Vue composables (`useX.ts`)
- `src/stores/` – Pinia stores
- `src/pages/` – Routed pages (file-based routing)
- `src/locales/` – i18n translation files
- `uno.config.ts` – UnoCSS configuration

---

## 🎨 Styling

- **UnoCSS**: all styling is done with UnoCSS utility classes, mobile-first and fully responsive.
- **Dark/Light mode**: use `dark:` variants for color, background, and border utilities.
- **Attributify**: take advantage of attributify mode for clarity, e.g.,
  `<div m="4" md="m-8" hover="bg-gray-100" dark="bg-gray-800" />`
- **Scoped CSS**: only for advanced or CSS3 features not possible via UnoCSS. Prefer CSS variables for dynamic styles.
- **Animations/Transitions**: always use CSS3 transitions/animations for UI feedback and respect `prefers-reduced-motion` for accessibility.

---

## 💡 Coding Standards

- **Vue 3 (Composition API)**: Only `<script setup lang="ts">` syntax is allowed for SFCs.
- **Strict TypeScript**: Use precise types everywhere. No `any`, use `as const`, enums, utility types, and generics when appropriate.
- **Auto-imports**:
  - **Vue core functions** (`ref`, `computed`, `watch`, etc.)
  - **VueUse** (`useXxx` from `@vueuse/core`)
  - **Project composables** (from `/composables`)
  - **Pinia stores** (from `/stores`)
  - **Components** (from `/components`)
    are **all auto-imported** – never import them manually except in rare edge cases (dynamic import, SSR, etc.).
- **Props, Slots, Events**:
  - Must always be strictly typed and documented via jsdoc.
  - All events emitted must be declared via `defineEmits` and typed.
- **Accessibility**:
  - All interactive components must be accessible (ARIA roles/attributes, focus state, tab order, keyboard navigation).
  - Use semantic HTML and always support both mouse and keyboard users.
- **Internationalization**:
  - Never use hardcoded strings in UI – always use i18n keys.
  - Translation files (`*.i18n.yml`) should live next to each component/store/module and be merged automatically.
- **Code factorization**:
  - Never duplicate logic – always factor shared code into composables or utilities.
  - Keep components atomic, focused, and reusable.
- **DirectoryAsNamespace**:
  - For components in subfolders, their folder name is part of the component name (no "Ui" prefix in filenames).
- **Tests**:
  - All critical components/composables must have unit tests (Vitest).
  - Prefer colocated `.spec.ts` files.
- **Comments/Docs**:
  - Add concise jsdoc comments for public APIs, complex logic, and every composable/store export.

---

## 🛠️ Auto-imports & Naming

- **Everything listed below is auto-imported (do NOT import manually):**
  - Vue 3 core APIs (ref, computed, etc.)
  - VueUse composables (useDebounceFn, useElementSize, etc.)
  - Custom composables from `/composables`
  - Pinia stores from `/stores` (always use by their exported function, e.g., `const user = useUserStore()`)
  - Vue components from `/components` (PascalCase, with directory as namespace)
- **Component naming:**
  - Use PascalCase in usage.
  - No prefix in filename if already in a namespace folder: `/components/ui/Button.vue` (`<UiButton />` in template).
  - Never name a file `UiButton.vue` if already inside `/ui/`.
- **NEVER** add manual imports for auto-imported entities, except in rare edge technical cases (dynamic import, code splitting, etc.).
- **New files must follow this pattern:**
  - `/components/ui/Button.vue`
  - `/components/form/TextInput.vue`
  - `/composables/useFetchData.ts`
  - `/stores/userStore.ts`

---

## 🧩 Translations

- **Translation files** (`*.i18n.yml`) are colocated with their components, stores, or data modules.
- These files are automatically discovered and merged.
- See `translations.md` for details on the translation workflow.

---

## 🔐 Security

- Always validate and sanitize all user inputs and props.
- Escape any potentially unsafe data rendered in the UI.
- Do not trust client data; always verify on the server side if applicable.

---

## ♿ Accessibility & UX

- All components must be fully accessible (a11y), including proper aria attributes, roles, focus/focus-visible state, and keyboard navigation.
- Provide visible focus indicators and use appropriate colors for contrast.
- Respect user motion preferences (`prefers-reduced-motion`).
- Avoid UX anti-patterns; favor clear feedback, smooth transitions, and predictable behavior.

---

## 📄 Documentation & Comments

- All public component APIs and composable/store exports must be documented using concise jsdoc.
- Add README or header comments for any complex module or system.
- All source code must remain clean, readable, and maintainable.
  **No technical debt or "quick hacks" are allowed.**

---

## 📦 Repo Checklist

- [x] UnoCSS configured (see `uno.config.ts`)
- [x] Pinia enabled (`/stores`)
- [x] VueUse installed and imported
- [x] Auto-imports and components auto-registration configured
- [x] All dependencies managed with pnpm and versioned
- [x] Lint, typecheck, test, and build scripts defined in `package.json`

---

## 🛡️ Final Reminders

- **Do not deviate from these guidelines**. Any code, PR, or generated file not strictly conforming must be refactored before merge.
- If unsure about a convention, **ask the team or refer to this file**.
- Always favor clarity, reusability, accessibility, and type safety.

---

_Last updated: 2025-07-29 – Please check this file regularly for updates and evolving conventions._
