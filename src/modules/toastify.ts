import type { ToastContainerOptions } from 'vue3-toastify'

import type { UserModule } from '~/types'
import Vue3Toastify from 'vue3-toastify'

export const install: UserModule = ({ app }) => {
  app.use(Vue3Toastify, {
    autoClose: 5000,
  } as ToastContainerOptions)
}
