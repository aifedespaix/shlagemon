import { defineStore } from 'pinia'
import { ref } from 'vue'
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
  { key: '1', action: { type: 'use-item', itemId: 'potion' } },
  { key: '2', action: { type: 'use-item', itemId: 'super-potion' } },
  { key: '3', action: { type: 'use-item', itemId: 'hyper-potion' } },
]

export const useShortcutsStore = defineStore('shortcuts', () => {
  const shortcuts = ref<ShortcutEntry[]>([...defaultShortcuts])

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
    if (entry.action.type === 'use-item')
      useInventoryStore().useItem(entry.action.itemId)
  }

  return { shortcuts, add, update, remove, reset, handleKeydown }
}, {
  persist: true,
})
