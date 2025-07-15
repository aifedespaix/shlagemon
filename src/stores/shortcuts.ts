import { defineStore } from 'pinia'
import { allItems } from '~/data/items/items'
import { useBallStore } from './ball'
import { useEvolutionItemStore } from './evolutionItem'
import { useFeatureLockStore } from './featureLock'
import { useInventoryStore } from './inventory'
import { useItemUsageStore } from './itemUsage'
import { useWearableItemStore } from './wearableItem'

export interface UseItemAction {
  type: 'use-item'
  itemId: string
}

export type ShortcutAction = UseItemAction

export interface ShortcutEntry {
  key: string
  action: ShortcutAction
}

const defaultShortcuts: ShortcutEntry[] = [
  { key: 'a', action: { type: 'use-item', itemId: 'potion' } },
  { key: 'z', action: { type: 'use-item', itemId: 'super-potion' } },
  { key: 'e', action: { type: 'use-item', itemId: 'hyper-potion' } },
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

  function setItemShortcut(itemId: string, key: string) {
    const idx = shortcuts.value.findIndex(s => s.action.type === 'use-item' && s.action.itemId === itemId)
    const entry: ShortcutEntry = { key, action: { type: 'use-item', itemId } }
    if (idx >= 0)
      shortcuts.value[idx] = entry
    else
      shortcuts.value.push(entry)
  }

  function handleKeydown(e: KeyboardEvent) {
    const entry = shortcuts.value.find(s => s.key === e.key)
    if (!entry)
      return
    if (entry.action.type === 'use-item') {
      if (lock.isInventoryLocked)
        return

      const item = allItems.find(i => i.id === entry.action.itemId)
      if (!item)
        return

      const inventory = useInventoryStore()
      const usage = useItemUsageStore()
      if ('catchBonus' in item) {
        useBallStore().setBall(item.id as any)
        usage.markUsed(item.id)
      }
      else if (item.type === 'evolution') {
        useEvolutionItemStore().open(item)
      }
      else if (item.wearable) {
        useWearableItemStore().open(item)
      }
      else {
        if (inventory.useItem(item.id))
          usage.markUsed(item.id)
      }
    }
  }

  return { shortcuts, add, update, remove, reset, setItemShortcut, handleKeydown }
}, {
  persist: true,
})
