import type { ToastContainerOptions } from 'vue3-toastify'

import type { UserModule } from '~/types'
import Vue3Toastify, { updateGlobalOptions } from 'vue3-toastify'

export const install: UserModule = ({ app, isClient }) => {
  const isDark = useDark()
  app.use(Vue3Toastify, {
    autoClose: 5000,
    theme: isDark.value ? 'dark' : 'light',
  } as ToastContainerOptions)
  if (isClient)
    watch(isDark, val => updateGlobalOptions({ theme: val ? 'dark' : 'light' }))
}
