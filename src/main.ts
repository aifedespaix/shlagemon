import type { UserModule } from './types'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/battle.css'
import 'uno.css'
import 'vue3-toastify/dist/index.css'
import 'floating-vue/dist/style.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
  },
)
