<script setup lang="ts">
import type { ItemId } from '~/data/items'
import type { ShortcutEntry } from '~/stores/shortcuts'
import { allItems } from '~/data/items'

const store = useShortcutsStore()
const { t } = useI18n()

function addShortcut() {
  const firstItem = allItems[0]
  const entry: ShortcutEntry = {
    key: '',
    action: { type: 'use-item', itemId: firstItem.id as ItemId },
  }
  store.add(entry)
}

function reset() {
  store.reset()
}
</script>

<template>
  <div class="flex gap-2">
    <UiButton class="flex-1 gap-2" @click="addShortcut">
      <div i-carbon:add />
      {{ t('components.settings.ShortcutsTab.add') }}
    </UiButton>
    <UiButton type="danger" class="flex-1 gap-2" @click="reset">
      <div i-carbon:reset />
      {{ t('components.settings.ShortcutsTab.reset') }}
    </UiButton>
  </div>
</template>
