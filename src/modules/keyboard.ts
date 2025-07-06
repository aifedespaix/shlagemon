import type { UserModule } from '~/types'
import { useShortcutsStore } from '~/stores/shortcuts'

export const install: UserModule = ({ isClient }) => {
  if (!isClient)
    return
  const store = useShortcutsStore()
  window.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement | null
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable))
      return
    store.handleKeydown(event)
  })
}
