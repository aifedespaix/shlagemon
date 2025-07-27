<script setup lang="ts">
import type { ItemId } from '~/data/items'
import type { ShortcutEntry } from '~/stores/shortcuts'
import { allItems } from '~/data/items'

const store = useShortcutsStore()
const { t } = useI18n()

const itemOptions = allItems.map(i => ({ label: i.name, value: i.id }))

function updateKey(index: number, key: string) {
  const entry = { ...store.shortcuts[index], key }
  store.update(index, entry)
}

function updateItem(index: number, itemId: ItemId) {
  const entry: ShortcutEntry = {
    key: store.shortcuts[index].key,
    action: { type: 'use-item', itemId },
  }
  store.update(index, entry)
}

function addShortcut() {
  const firstItem = allItems[0]
  const entry: ShortcutEntry = {
    key: '',
    action: { type: 'use-item', itemId: firstItem.id },
  }
  store.add(entry)
}

function removeShortcut(index: number) {
  store.remove(index)
}

function reset() {
  store.reset()
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-for="(sc, idx) in store.shortcuts" :key="idx" class="flex items-center gap-2">
      <UiKeyCapture
        class="w-12"
        :model-value="sc.key"
        @update:model-value="val => updateKey(idx, val)"
      />
      <UiSelectOption
        class="flex-1"
        :model-value="sc.action.type === 'use-item' ? sc.action.itemId : ''"
        :options="itemOptions"
        @update:model-value="val => updateItem(idx, val as ItemId)"
      />
      <UiButton type="icon" class="h-7 w-7" @click="removeShortcut(idx)">
        <div i-carbon-close />
      </UiButton>
    </div>
    <div class="mt-2 flex gap-2">
      <UiButton class="flex-1" @click="addShortcut">
        {{ t('components.settings.ShortcutsTab.add') }}
      </UiButton>
      <UiButton type="danger" class="flex-1" @click="reset">
        {{ t('components.settings.ShortcutsTab.reset') }}
      </UiButton>
    </div>
  </div>
</template>
