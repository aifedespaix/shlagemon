# Guidelines

This repository is a Vue 3 project built with Vite and TypeScript. It follows the official best practices and uses **pnpm** as package manager. Styling is handled mainly with **UnoCSS** (preset-wind3 and attributify mode) and dark/light themes are supported via `dark:` utilities.

## Local setup

- Install dependencies:
  ```bash
  pnpm install
  ```
- Start the dev server:
  ```bash
  pnpm dev
  ```
  The app runs on <http://localhost:3333>.
- Build for production:
  ```bash
  pnpm build
  ```

## Testing

- Unit tests (Vitest):
  ```bash
  pnpm test:unit
  ```
- End-to-end tests (Cypress):
  ```bash
  pnpm test:e2e
  ```
- A convenience command runs all tests:
  ```bash
  pnpm test
  ```

## Coding style

- Use UnoCSS classes whenever possible. For complex cases add scoped CSS inside components.
- The design is mobile first. Use `sm:` `md:` `lg:` etc. with attributify syntax, e.g. `md="px-4"` and `hover="bg-gray-100"`.
- Provide both light and dark color variants using `dark:` utilities when needed.
- Keep components small and reusable (buttons, cards, etc.).
- Use Pinia stores and split the logic for maintainability.
- Latest Vue 3 features (script setup, `<script lang="ts">`) should be used.

## Repo structure

- `src/components/` – UI components
- `src/stores/` – Pinia stores
- `src/pages/` – page components (routed automatically)
- `uno.config.ts` – UnoCSS config

Check `package.json` for additional scripts such as `lint`, `typecheck`, or `deploy`.
