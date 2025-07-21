<script setup lang="ts">
import type { Item } from '~/type/item'
import { storeToRefs } from 'pinia'
import { ballHues } from '~/utils/ball'

const props = defineProps<{ item: Item, qty: number, disabled?: boolean }>()
const emit = defineEmits<{
  (e: 'use'): void
  (e: 'sell'): void
}>()
const { t } = useI18n()

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

const isEgg = computed(() => props.item.id.startsWith('oeuf-'))
const isEggBox = computed(() => props.item.id === 'egg-box')

const actionLabel = computed(() => {
  if (isEggBox.value)
    return t('components.inventory.ItemCard.action.open')
  if ('catchBonus' in props.item || props.item.wearable)
    return props.disabled ? t('components.inventory.ItemCard.action.equipped') : t('components.inventory.ItemCard.action.equip')
  return t('components.inventory.ItemCard.action.use')
})

const highlightClasses = 'animate-pulse-alt  animate-count-infinite'

const shortcutStore = useShortcutsStore()
const { shortcuts } = storeToRefs(shortcutStore)
const { isMobile } = storeToRefs(useUIStore())
const shortcutModal = useItemShortcutModalStore()

const shortcutKey = computed(() => {
  const entry = shortcuts.value.find(s => s.action.type === 'use-item' && s.action.itemId === props.item.id)
  return entry?.key || '?'
})

function openShortcutModal() {
  shortcutModal.open(props.item)
}

function useFromModal() {
  showInfo.value = false
  emit('use')
}

watch(showInfo, (val) => {
  if (val) {
    zoom.value = true
    useTimeoutFn(() => (zoom.value = false), 300)
  }
})
</script>

<template>
  <div
    class="relative m-x-1 flex flex-col cursor-pointer gap-1 border rounded bg-white p-1 dark:bg-gray-900"
    :class="[isUnused ? highlightClasses : '', zoom ? 'open-zoom' : '']"
    @click="onCardClick"
  >
    <div class="flex items-center justify-between gap-1">
      <div class="flex items-center gap-1">
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
      <UiKbd
        v-if="!isMobile"
        clickable
        size="sm"
        :key-name="shortcutKey"
        class="self-baseline"
        :title="t('components.inventory.ItemCard.shortcutTooltip')"
        @click.stop="openShortcutModal"
      />
    </div>
    <div class="flex items-center justify-end gap-1">
      <span class="font-bold">x{{ props.qty }}</span>
      <UiButton
        v-if="!isEgg"
        class="flex items-center gap-1 text-xs"
        :disabled="props.disabled"
        @click.stop="emit('use')"
      >
        <div i-carbon-play inline-block />
        {{ actionLabel }}
      </UiButton>
    </div>
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
        <UiButton
          v-if="!isEgg"
          class="flex items-center gap-1 text-xs"
          :disabled="props.disabled"
          @click.stop="useFromModal"
        >
          <div i-carbon-play inline-block />
          {{ actionLabel }}
        </UiButton>
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
