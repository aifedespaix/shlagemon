import type { ItemId } from '~/data/items'
import type { BallId } from '~/data/items/shlageball'
import { defineStore } from 'pinia'
import {
  allItems,
  hyperPotion,
  odorElixir,
  potion,
  superPotion,
} from '~/data/items'

export interface UseItemAction {
  type: 'use-item'
  itemId: ItemId
}

export type ShortcutAction = UseItemAction

export interface ShortcutEntry {
  key: string
  action: ShortcutAction
}

const defaultShortcuts: ShortcutEntry[] = [
  { key: 'a', action: { type: 'use-item', itemId: potion.id } },
  { key: 'z', action: { type: 'use-item', itemId: superPotion.id } },
  { key: 'e', action: { type: 'use-item', itemId: hyperPotion.id } },
]

export const useShortcutsStore = defineStore('shortcuts', () => {
  const shortcuts = ref<ShortcutEntry[]>([...defaultShortcuts])
  const lock = useFeatureLockStore()

  function add(entry: ShortcutEntry) {
    shortcuts.value.push(entry)
  }

  function update(index: number, entry: ShortcutEntry) {
    if (shortcuts.value[index])
      shortcuts.value[index] = entry
  }

  function remove(index: number) {
    shortcuts.value.splice(index, 1)
  }

  function reset() {
    shortcuts.value = [...defaultShortcuts]
  }

  function setItemShortcut(itemId: ItemId, key: string) {
    const idx = shortcuts.value.findIndex(s => s.action.type === 'use-item' && s.action.itemId === itemId)
    const entry: ShortcutEntry = { key, action: { type: 'use-item', itemId } }
    if (idx >= 0)
      shortcuts.value[idx] = entry
    else
      shortcuts.value.push(entry)
  }

  function handleKeydown(e: KeyboardEvent) {
    const entries = shortcuts.value.filter(s => s.key === e.key)
    if (!entries.length)
      return

    if (lock.isInventoryLocked)
      return

    const inventory = useInventoryStore()
    const usage = useItemUsageStore()
    const panel = useMainPanelStore()
    const battleCooldown = useBattleItemCooldownStore()

    for (const entry of entries) {
      if (entry.action.type === 'use-item') {
        const item = allItems.find(i => i.id === entry.action.itemId)
        if (!item)
          continue

        if (item.category === 'battle' && battleCooldown.isActive)
          continue
        if (panel.current === 'trainerBattle' && item.category !== 'battle')
          continue
        if ('catchBonus' in item) {
          useBallStore().equip(item.id as BallId)
          usage.markUsed(item.id)
        }
        else if (item.category === 'activable') {
          useKingPotionStore().equip(item.id)
          usage.markUsed(item.id)
        }
        else if (item.type === 'evolution') {
          useEvolutionItemStore().open(item)
        }
        else if (item.wearable) {
          useWearableItemStore().open(item)
        }
        else if (item.id === odorElixir.id) {
          useOdorElixirStore().open(item)
        }
        else {
          if (inventory.useItem(item.id))
            usage.markUsed(item.id)
        }
      }
    }
  }

  return { shortcuts, add, update, remove, reset, setItemShortcut, handleKeydown }
}, {
  persist: true,
})
