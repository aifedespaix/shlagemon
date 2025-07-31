<script setup lang="ts">
import type { Item } from '~/type/item'
import { storeToRefs } from 'pinia'
import {
  eggBox,
  fabulousPotion,
  mysteriousPotion,
  specialPotion,
} from '~/data/items'
import { ballHues } from '~/utils/ball'

const props = defineProps<{ item: Item, qty: number, disabled?: boolean }>()
const emit = defineEmits<{
  (e: 'use'): void
  (e: 'sell'): void
}>()
const { t } = useI18n()

const showInfo = ref(false)
const usage = useItemUsageStore()
const kingPotionIds = [fabulousPotion.id, mysteriousPotion.id, specialPotion.id]
const isUnused = computed(() => !usage.used[props.item.id])
const zoom = ref(false)
function onCardClick() {
  showInfo.value = true
  usage.markUsed(props.item.id)
}
const details = computed(() =>
  t(props.item.details ?? props.item.description),
)
const ballFilter = computed(() =>
  'catchBonus' in props.item ? { filter: `hue-rotate(${ballHues[props.item.id]})` } : {},
)

const isEgg = computed(() => props.item.id.startsWith('oeuf-'))
const isEggBox = computed(() => props.item.id === eggBox.id)
const isKingPotion = computed(() => kingPotionIds.includes(props.item.id))

const actionLabel = computed(() => {
  if (isEggBox.value)
    return t('components.inventory.ItemCard.action.open')
  if ('catchBonus' in props.item || props.item.wearable || isKingPotion.value)
    return props.disabled ? t('components.inventory.ItemCard.action.equipped') : t('components.inventory.ItemCard.action.equip')
  return t('components.inventory.ItemCard.action.use')
})

const highlightClasses = 'animate-pulse-alt animate-count-infinite'

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
    class="group relative min-h-12 flex cursor-pointer select-none items-center gap-2 border rounded-lg bg-white px-2 py-1 shadow-sm outline-none transition-all duration-150 dark:bg-gray-900"
    :class="[isUnused ? highlightClasses : '', zoom ? 'open-zoom' : '', disabled ? 'opacity-50' : 'hover:shadow-lg hover:scale-[1.01] active:scale-100']"
    tabindex="0"
    role="button"
    :aria-disabled="disabled"
    @click="onCardClick"
  >
    <!-- Icone à gauche -->
    <div class="relative h-9 w-9 flex flex-shrink-0 items-center justify-center">
      <div
        v-if="props.item.icon"
        class="h-full w-full" :class="[props.item.iconClass, props.item.icon]"
      />
      <img
        v-else-if="props.item.image"
        :src="props.item.image"
        :alt="t(props.item.name)"
        class="h-full w-full object-contain"
        :style="ballFilter"
      >
    </div>

    <!-- Colonne centrale : nom et desc -->
    <div class="min-w-0 flex flex-1 flex-col justify-center leading-tight">
      <div
        class="min-h-[2.4em] flex items-center gap-1 text-sm font-semibold leading-tight"
        style="word-break: break-word;"
      >
        <span
          class="line-clamp-2 block overflow-hidden"
          style="max-height: 2.8em;"
        >
          {{ t(props.item.name) }}
        </span>
      </div>
      <div
        v-if="props.item.shortDesc"
        class="line-clamp-1 overflow-hidden text-xs text-gray-500 dark:text-gray-400"
      >
        {{ t(props.item.shortDesc) }}
      </div>
    </div>

    <!-- Actions à droite : quantité + bouton (jamais débordant) -->
    <div class="ml-2 min-w-20 flex flex-col items-end justify-center gap-0.5">
      <div class="h-7 flex items-center gap-1">
        <span
          v-if="qty > 1"
          class="flex-shrink-0 rounded bg-gray-100 px-1 py-0 text-xs text-gray-700 font-bold dark:bg-gray-700 dark:text-gray-100"
          style="height: 22px; display: flex; align-items: center;"
        >
          x{{ qty }}
        </span>
        <UiButton
          v-if="!isEgg"
          :disabled="props.disabled"
          size="xs"
          @click.stop="emit('use')"
        >
          <div i-carbon-play inline-block class="text-base text-xs" />
          {{ actionLabel }}
        </UiButton>
        <UiKbd
          v-if="!isMobile"
          clickable
          size="sm"
          :key-name="shortcutKey"
          :title="t('components.inventory.ItemCard.shortcutTooltip')"
          @click.stop="openShortcutModal"
        />
      </div>
    </div>

    <!-- MODAL inchangé -->
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
