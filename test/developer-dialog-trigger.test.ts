import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useDialogStore } from '../src/stores/dialog'
import { useZoneStore } from '../src/stores/zone'
import { useZoneVisitStore } from '../src/stores/zoneVisit'

/**
 * Ensures the developer dialog triggers when entering the second village.
 */
describe('developer dialog trigger', () => {
  it('activates after visiting village-boule', () => {
    setActivePinia(createPinia())
    const zone = useZoneStore()
    const visit = useZoneVisitStore()
    const dialog = useDialogStore()

    const dev = dialog.dialogs.find(d => d.id === 'developerSupport')
    expect(dev?.condition()).toBe(false)

    zone.setZone('village-boule')
    expect(dev?.condition()).toBe(true)

    visit.reset()
    zone.reset()
  })
})
