<script setup lang="ts">
import type { Item } from '~/type/item'
import { useItemUsageStore } from '~/stores/itemUsage'
import { ballHues } from '~/utils/ball'

const props = withDefaults(defineProps<{ item: Item, qty: number, disabled?: boolean, opened?: boolean }>(), {
  opened: false,
})
const emit = defineEmits<{
  (e: 'use'): void
  (e: 'sell'): void
  (e: 'toggle'): void
}>()

const showInfo = ref(false)
const usage = useItemUsageStore()
const isUnused = computed(() => !usage.used[props.item.id])
function onCardClick() {
  emit('toggle')
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
</script>

<template>
  <div
    class="relative flex flex-col cursor-pointer gap-1 border rounded bg-white p-2 dark:bg-gray-900"
    :class="isUnused ? highlightClasses : ''"
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
      <div class="i-carbon-chevron-down absolute right-1 top-1 text-xs transition-transform" :class="props.opened ? '' : 'rotate-90'" />
    </div>
    <span v-show="props.opened" class="text-xs">{{ props.item.description }}</span>
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
