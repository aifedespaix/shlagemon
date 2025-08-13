import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useMainPanelStore } from '../src/stores/mainPanel'

/** Ensure the breeding panel can be opened through the main panel store. */
describe('main panel breeding', () => {
  it('switches current panel to breeding', () => {
    setActivePinia(createPinia())
    const panel = useMainPanelStore()
    panel.showBreeding()
    expect(panel.current).toBe('breeding')
  })
})
