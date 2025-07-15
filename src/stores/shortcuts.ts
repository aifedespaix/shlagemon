import { defineStore } from 'pinia'
import { useFeatureLockStore } from './featureLock'
import { useInventoryStore } from './inventory'

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

  function handleKeydown(e: KeyboardEvent) {
    const entry = shortcuts.value.find(s => s.key === e.key)
    if (!entry)
      return
    if (entry.action.type === 'use-item') {
      if (lock.isInventoryLocked)
        return
      useInventoryStore().useItem(entry.action.itemId)
    }
  }

  return { shortcuts, add, update, remove, reset, handleKeydown }
}, {
  persist: true,
})
