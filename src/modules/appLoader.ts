import type { UserModule } from '~/types'

/**
 * Signals when the router is ready so the UI can hide the initial loader.
 */
export const install: UserModule = ({ isClient, router }) => {
  if (!isClient)
    return

  const app = useAppStore()
  router.isReady().then(() => {
    app.setReady()
  }).catch(() => {
    app.setReady()
  })
}
