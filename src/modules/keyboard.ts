import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient }) => {
  if (!isClient)
    return
  const store = useShortcutsStore()
  const capture = useKeyboardCaptureStore()
  window.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement | null
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable))
      return
    if (capture.capturing)
      return
    store.handleKeydown(event)
  })
}
