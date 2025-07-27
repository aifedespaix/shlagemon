import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { potion, superPotion } from '../src/data/items'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useShortcutsStore } from '../src/stores/shortcuts'

// Ensure multiple shortcuts using the same key all trigger

describe('shortcuts', () => {
  it('triggers all actions bound to the same key', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const shortcuts = useShortcutsStore()
    // need an active shlagemon for potions to work
    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)
    inventory.add(potion.id)
    inventory.add(superPotion.id)
    shortcuts.shortcuts = [
      { key: 'a', action: { type: 'use-item', itemId: potion.id } },
      { key: 'a', action: { type: 'use-item', itemId: superPotion.id } },
    ]
    shortcuts.handleKeydown(new KeyboardEvent('keydown', { key: 'a' }))
    expect(inventory.items[potion.id]).toBeUndefined()
    expect(inventory.items[superPotion.id]).toBeUndefined()
  })
})
