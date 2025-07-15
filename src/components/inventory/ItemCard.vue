<script setup lang="ts">
import type { Item } from '~/type/item'
import { useItemUsageStore } from '~/stores/itemUsage'
import { useShortcutsStore } from '~/stores/shortcuts'
import { useUIStore } from '~/stores/ui'
import { storeToRefs } from 'pinia'
import { ballHues } from '~/utils/ball'

const props = defineProps<{ item: Item, qty: number, disabled?: boolean }>()
const emit = defineEmits<{
  (e: 'use'): void
  (e: 'sell'): void
}>()

const showInfo = ref(false)
const usage = useItemUsageStore()
const isUnused = computed(() => !usage.used[props.item.id])
const zoom = ref(false)
function onCardClick() {
  showInfo.value = true
  usage.markUsed(props.item.id)
}
const details = computed(() => props.item.details || props.item.description)
const ballFilter = computed(() =>
  'catchBonus' in props.item ? { filter: `hue-rotate(${ballHues[props.item.id]})` } : {},
)

const actionLabel = computed(() => {
  if ('catchBonus' in props.item)
    return props.disabled ? 'Équipé' : 'Équiper'
  return 'Utiliser'
})

const highlightClasses = 'animate-pulse-alt  animate-count-infinite'

const { shortcuts } = storeToRefs(useShortcutsStore())
const { isMobile } = storeToRefs(useUIStore())

const shortcutKey = computed(() => {
  const entry = shortcuts.value.find(s => s.action.type === 'use-item' && s.action.itemId === props.item.id)
  return entry?.key || '?'
})

watch(showInfo, (val) => {
  if (val) {
    zoom.value = true
    setTimeout(() => (zoom.value = false), 300)
  }
})
</script>

<template>
  <div
    class="relative flex flex-col cursor-pointer gap-1 border rounded bg-white p-2 dark:bg-gray-900"
    :class="[isUnused ? highlightClasses : '', zoom ? 'open-zoom' : '']"
    @click="onCardClick"
  >
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <div
          v-if="props.item.icon"
          class="h-8 w-8"
          :class="[props.item.iconClass, props.item.icon]"
        />
        <img
          v-else-if="props.item.image"
          :src="props.item.image"
          :alt="props.item.name"
          class="h-8 w-8 object-contain"
          :style="ballFilter"
        >
        <span class="font-bold">{{ props.item.name }}</span>
      </div>
      <UiKbd v-if="!isMobile" size="sm" :key-name="shortcutKey" />
    </div>
    <div class="mt-1 flex items-center justify-end gap-1">
      <span class="font-bold">x{{ props.qty }}</span>
      <UiButton
        class="flex items-center gap-1 text-xs"
        :disabled="props.disabled"
        @click.stop="emit('use')"
      >
        <div i-carbon-play inline-block />
        {{ actionLabel }}
      </UiButton>
    </div>
    <button
      class="absolute bottom-1 left-1 h-4 w-4 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
      @click.stop="showInfo = true"
    >
      <div i-carbon-help class="text-xs" />
    </button>

    <Modal v-model="showInfo" footer-close>
      <div class="flex flex-col items-center gap-2">
        <div
          v-if="props.item.icon"
          class="h-16 w-16"
          :class="[props.item.iconClass, props.item.icon]"
        />
        <img
          v-else-if="props.item.image"
          :src="props.item.image"
          :alt="props.item.name"
          class="h-16 w-16 object-contain"
          :style="ballFilter"
        >
        <h3 class="text-lg font-bold">
          {{ props.item.name }}
        </h3>
        <p class="text-center text-sm">
          {{ details }}
        </p>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.open-zoom {
  animation: open-zoom 0.2s ease;
}

@keyframes open-zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
