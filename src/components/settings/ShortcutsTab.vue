<script setup lang="ts">
import type { ItemId } from '~/data/items'
import type { ShortcutEntry } from '~/stores/shortcuts'
import { allItems } from '~/data/items'

const store = useShortcutsStore()
const { t } = useI18n()

const itemOptions = computed(() =>
  allItems.map(i => ({
    label: t(i.name),
    value: i.id,
  })),
)

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

function removeShortcut(index: number) {
  store.remove(index)
}
</script>

<template>
  <div class="flex flex-col gap-2">
  <UiListItem
    v-for="(sc, idx) in store.shortcuts"
    :key="idx"
    class="py-1"
    :aria-label="`Raccourci ${idx + 1}`"
    role="listitem"
  >
    <!-- Slot gauche : capture de touche -->
    <template #left>
      <UiKeyCapture
        class="w-12"
        :model-value="sc.key"
        @update:model-value="val => updateKey(idx, val)"
      />
    </template>

    <!-- Slot par défaut : select d'item -->
    <UiSelectOption
      class="flex-1 min-w-0"
      :model-value="sc.action.type === 'use-item' ? sc.action.itemId : ''"
      :options="itemOptions"
      @update:model-value="val => updateItem(idx, val as ItemId)"
    />

    <!-- Slot droite : bouton supprimer -->
    <template #right>
      <UiButton type="icon" size="xs"  @click="removeShortcut(idx)">
        <div i-carbon-close />
      </UiButton>
    </template>
  </UiListItem>

  </div>
</template>
