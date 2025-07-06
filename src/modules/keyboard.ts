import type { UserModule } from '~/types'
import { useKeyboardCaptureStore } from '~/stores/keyboardCapture'
import { useShortcutsStore } from '~/stores/shortcuts'

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
