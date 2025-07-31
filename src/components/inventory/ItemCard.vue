<script setup lang="ts">
// Typage ultra strict
import type { Item } from '~/type/item'
import { storeToRefs } from 'pinia'
import { eggBox, fabulousPotion, mysteriousPotion, specialPotion } from '~/data/items'
import { ballHues } from '~/utils/ball'

const props = defineProps<{
  item: Item
  qty: number
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'use'): void
  (e: 'sell'): void
}>()
const { t } = useI18n()

const usage = useItemUsageStore()
const shortcutStore = useShortcutsStore()
const shortcutModal = useItemShortcutModalStore()
const { shortcuts } = storeToRefs(shortcutStore)
const { isMobile } = storeToRefs(useUIStore())

// Anim state
const showInfo = ref(false)
const zoom = ref(false)

const kingPotionIds = [fabulousPotion.id, mysteriousPotion.id, specialPotion.id] as const
const isEgg = computed(() => props.item.id.startsWith('oeuf-'))
const isEggBox = computed(() => props.item.id === eggBox.id)
const isKingPotion = computed(() => kingPotionIds.includes(props.item.id))

const isUnused = computed(() => !usage.used[props.item.id])
const ballFilter = computed(() =>
  'catchBonus' in props.item ? { filter: `hue-rotate(${ballHues[props.item.id]})` } : {},
)
const details = computed(() =>
  t(props.item.details ?? props.item.description),
)
const actionLabel = computed(() => {
  if (isEggBox.value)
    return t('components.inventory.ItemCard.action.open')
  if ('catchBonus' in props.item || props.item.wearable || isKingPotion.value) {
    return props.disabled
      ? t('components.inventory.ItemCard.action.equipped')
      : t('components.inventory.ItemCard.action.equip')
  }
  return t('components.inventory.ItemCard.action.use')
})
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
function onCardClick() {
  showInfo.value = true
  usage.markUsed(props.item.id)
}
watch(showInfo, (val) => {
  if (val) {
    zoom.value = true
    useTimeoutFn(() => (zoom.value = false), 200)
  }
})
</script>

<template>
  <article
    class="hover:bg-primary-50/50 focus-visible:ring-primary-400 relative min-h-16 w-full flex items-center gap-1 overflow-hidden border rounded-xl bg-white/95 p-1 shadow-sm outline-none transition-all duration-150 active:scale-98 dark:bg-gray-900/90 hover:shadow-lg focus-visible:ring-2"
    :class="[
      isUnused ? 'animate-pulse-alt animate-count-infinite' : '',
      zoom ? 'open-zoom' : '',
    ]"
    tabindex="0"
    role="button"
    @click="onCardClick"
  >
    <!-- 1. Icon/image  -->
    <div class="h-full flex flex-shrink-0 items-center justify-center">
      <div
        v-if="props.item.icon"
        class="mx-auto h-7 w-7 sm:h-8 sm:w-8"
        :class="[props.item.iconClass, props.item.icon]"
      />
      <div
        v-else-if="props.item.image"
        class="h-7 w-7 sm:h-8 sm:w-8"
      >
        <UiImageByBackground
          :src="props.item.image"
          :alt="t(props.item.name)"
          class="h-full w-full"
          :style="ballFilter"
        />
      </div>
    </div>

    <div class="min-w-0 flex flex-1 flex-col justify-center">
      <span class="block text-base font-semibold leading-snug" md="text-xs" lg="text-base">
        {{ t(props.item.name) }}
      </span>
      <span
        v-if="props.item.shortDesc"
        class="truncate text-xs text-gray-500 dark:text-gray-400"
        :title="t(props.item.shortDesc)"
      >{{ t(props.item.shortDesc) }}</span>
    </div>

    <div class="min-w-8 w-20 flex flex-col items-end justify-center gap-1">
      <div class="w-full flex items-center justify-end gap-1">
        <span
          v-if="qty > 1"
          class="flex-1 rounded bg-gray-100 px-1 py-0.5 text-center text-xs text-gray-700 font-bold dark:bg-gray-700 dark:text-gray-100"
        >x {{ qty }}</span>
        <UiKbd
          v-if="!isMobile"
          clickable
          size="sm"
          :key-name="shortcutKey"
          :title="t('components.inventory.ItemCard.shortcutTooltip')"
          @click.stop="openShortcutModal"
        />
      </div>
      <UiButton
        v-if="!isEgg"
        :disabled="props.disabled"
        size="xs"
        class="flex items-center justify-center gap-1 !w-full"
        :aria-label="actionLabel"
        @click.stop="emit('use')"
      >
        <div i-carbon-play />
        <span class="text-xs font-medium">{{ actionLabel }}</span>
      </UiButton>
    </div>

    <UiModal v-model="showInfo" footer-close>
      <div class="flex flex-col items-center gap-2">
        <div
          v-if="props.item.icon"
          class="h-16 w-16"
          :class="[props.item.iconClass, props.item.icon]"
        />
        <img
          v-else-if="props.item.image"
          :src="props.item.image"
          :alt="t(props.item.name)"
          class="h-16 w-16 object-contain"
          :style="ballFilter"
        >
        <h3 class="text-lg font-bold">
          {{ t(props.item.name) }}
        </h3>
        <p class="text-center text-sm">
          {{ details }}
        </p>
        <UiButton
          v-if="!isEgg"
          class="flex items-center gap-1 text-xs"
          :disabled="props.disabled"
          size="sm"
          @click.stop="useFromModal"
        >
          <div i-carbon-play inline-block />
          {{ actionLabel }}
        </UiButton>
      </div>
    </UiModal>
  </article>
</template>

<style scoped>
.open-zoom {
  animation: open-zoom 0.15s cubic-bezier(0.55, 1.6, 0.38, 1.01);
}
@keyframes open-zoom {
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.045);
  }
  100% {
    transform: scale(1);
  }
}
.invcard:active {
  transform: scale(0.98);
}
</style>
