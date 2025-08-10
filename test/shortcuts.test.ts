import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { potion, specialPotion } from '../src/data/items'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useBattleItemCooldownStore } from '../src/stores/battleItemCooldown'
import { useInventoryStore } from '../src/stores/inventory'
import { useKingPotionStore } from '../src/stores/kingPotion'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useShortcutsStore } from '../src/stores/shortcuts'

// Ensure multiple shortcuts using the same key all trigger

describe('shortcuts', () => {
  it('triggers all actions bound to the same key', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const shortcuts = useShortcutsStore()
    const kingPotion = useKingPotionStore()
    // need an active shlagemon for potions to work
    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)
    inventory.add(potion.id)
    inventory.add(specialPotion.id)
    shortcuts.shortcuts = [
      { key: 'a', action: { type: 'use-item', itemId: specialPotion.id } },
      { key: 'a', action: { type: 'use-item', itemId: potion.id } },
    ]
    shortcuts.handleKeydown(new KeyboardEvent('keydown', { key: 'a' }))
    expect(kingPotion.current).toBe(specialPotion.id)
    expect(inventory.items[potion.id]).toBeUndefined()
  })

  it('equips activable items without consuming them', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const shortcuts = useShortcutsStore()
    const kingPotion = useKingPotionStore()

    inventory.add(specialPotion.id)
    kingPotion.equip(specialPotion.id)

    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)

    shortcuts.shortcuts = [
      { key: 'b', action: { type: 'use-item', itemId: specialPotion.id } },
    ]

    shortcuts.handleKeydown(new KeyboardEvent('keydown', { key: 'b' }))

    expect(inventory.items[specialPotion.id]).toBe(1)
    expect(kingPotion.current).toBe(specialPotion.id)
  })

  it('prevents using battle items during cooldown', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const shortcuts = useShortcutsStore()
    const cooldown = useBattleItemCooldownStore()

    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)

    inventory.add(potion.id, 2)

    shortcuts.shortcuts = [
      { key: 'a', action: { type: 'use-item', itemId: potion.id } },
    ]

    const event = new KeyboardEvent('keydown', { key: 'a' })
    shortcuts.handleKeydown(event)
    expect(inventory.items[potion.id]).toBe(1)
    expect(cooldown.isActive).toBe(true)
    shortcuts.handleKeydown(event)
    expect(inventory.items[potion.id]).toBe(1)
    vi.useRealTimers()
  })
})
