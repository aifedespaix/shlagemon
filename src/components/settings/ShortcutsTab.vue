<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import SelectOption from '~/components/ui/SelectOption.vue'
import { allItems } from '~/data/items/items'
import { useShortcutsStore } from '~/stores/shortcuts'

const store = useShortcutsStore()

const itemOptions = allItems.map(i => ({ label: i.name, value: i.id }))

function updateKey(index: number, key: string) {
  const entry = { ...store.shortcuts[index], key }
  store.update(index, entry)
}

function updateItem(index: number, itemId: string) {
  const entry = { key: store.shortcuts[index].key, action: { type: 'use-item', itemId } }
  store.update(index, entry)
}

function addShortcut() {
  const firstItem = allItems[0]
  store.add({ key: '', action: { type: 'use-item', itemId: firstItem.id } })
}

function reset() {
  store.reset()
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-for="(sc, idx) in store.shortcuts" :key="idx" class="flex items-center gap-2">
      <input
        :value="sc.key"
        class="w-12 border border-gray-300 rounded bg-white px-2 py-1 text-center dark:border-gray-700 dark:bg-gray-800"
        @input="updateKey(idx, ($event.target as HTMLInputElement).value)"
      >
      <SelectOption
        class="flex-1"
        :model-value="sc.action.type === 'use-item' ? sc.action.itemId : ''"
        :options="itemOptions"
        @update:model-value="val => updateItem(idx, val as string)"
      />
    </div>
    <div class="mt-2 flex gap-2">
      <Button class="flex-1" @click="addShortcut">
        Ajouter un raccourci
      </Button>
      <Button type="danger" class="flex-1" @click="reset">
        Réinitialiser
      </Button>
    </div>
  </div>
</template>
