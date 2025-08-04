<script setup lang="ts">
import type { ActiveEffect } from '~/type/effect'
import type { DexShlagemon } from '~/type/shlagemon'
import { allItems } from '~/data/items'
import { useDexDetailModalStore } from '~/stores/dexDetailModal'
import { useDexInfoModalStore } from '~/stores/dexInfoModal'
import DiseaseBadge from './DiseaseBadge.vue'
import EffectBadge from './EffectBadge.vue'

const props = withDefaults(defineProps<Props>(), {
  color: undefined,
  flipped: false,
  fainted: false,
  flash: false,
  levelPosition: 'bottom',
  showBall: false,
  owned: false,
  effects: () => [],
  disease: false,
  diseaseRemaining: 0,
})

const emit = defineEmits<{ (e: 'faintEnd'): void }>()

const { t } = useI18n()

interface Props {
  mon: DexShlagemon
  hp: number
  color?: string
  flipped?: boolean
  fainted?: boolean
  flash?: boolean
  levelPosition?: 'top' | 'bottom'
  showBall?: boolean
  owned?: boolean
  effects?: ActiveEffect[]
  disease?: boolean
  diseaseRemaining?: number
}

const typeChart = useTypeChartModalStore()
const dex = useShlagedexStore()
const infoModal = useDexInfoModalStore()
const detailModal = useDexDetailModalStore()

const now = ref(Date.now())
const { pause: stopTimer } = useIntervalFn(() => {
  now.value = Date.now()
}, 1000)
onUnmounted(stopTimer)

const lvlUp = ref(false)
const { start: hideLvlUp } = useTimeoutFn(() => (lvlUp.value = false), 600, { immediate: false })
watch(
  () => props.mon.lvl,
  (val, old) => {
    if (val > old) {
      lvlUp.value = true
      hideLvlUp()
    }
  },
)

const documentVisibility = useDocumentVisibility()

watch(
  () => props.fainted,
  (fainted) => {
    if (fainted && documentVisibility.value === 'hidden')
      emit('faintEnd')
  },
)

watch(documentVisibility, (state) => {
  if (state === 'hidden' && props.fainted)
    emit('faintEnd')
})

function onAnimationEnd() {
  if (props.fainted)
    emit('faintEnd')
}

function showTypeChart() {
  const type = props.mon.base.types[0]
  if (type)
    typeChart.open(type.id)
}

function openInfo() {
  if (props.owned)
    detailModal.open(props.mon)
  else
    infoModal.open(props.mon)
}

const maxHp = computed(() => dex.maxHp(props.mon))

const heldItem = computed(() => {
  const id = props.mon.heldItemId
  return id ? allItems.find(i => i.id === id) || null : null
})
</script>

<template>
  <div
    class="relative h-full flex flex-1 flex-col items-center"
    :class="[{ 'saturate-10 contrast-200': props.disease }, { flash: props.flash }]"
    @contextmenu.prevent="openInfo"
  >
    <slot />
    <div class="absolute left-0 top-2 z-150 flex flex-col gap-1">
      <EffectBadge
        v-for="e in props.effects"
        :key="e.id"
        :effect="e"
        :now="now"
        @click="showTypeChart"
      />
      <DiseaseBadge v-if="props.disease" :remaining="props.diseaseRemaining" />
    </div>
    <InventoryWearableItemIcon
      v-if="heldItem"
      :item="heldItem"
      class="absolute bottom-9 left-0 z-150 h-6 w-6"
    />
    <UiButton
      v-tooltip="t('components.battle.Shlagemon.infoTooltip')"
      type="icon"
      size="xs"
      class="absolute bottom-9 right-0 z-150"
      :aria-label="t('components.battle.Shlagemon.infoTooltip')"
      @click="openInfo"
    >
      <div i-carbon-information />
    </UiButton>
    <ShlagemonImage
      :id="props.mon.base.id"
      :alt="props.mon.base.name"
      :shiny="props.mon.isShiny"
      class="min-h-25 flex-1"
      :class="[props.flipped ? '-scale-x-100' : '', { faint: props.fainted }]"
      @animationend="onAnimationEnd"
    />
    <div class="dust" :class="{ active: props.fainted }" />
    <div
      class="absolute left-0 text-sm font-bold"
      :class="[props.levelPosition === 'top' ? 'top-0' : 'bottom-0', { 'lvl-up': lvlUp }]"
    >
      lvl {{ props.mon.lvl }}
    </div>
    <div class="mt-1 flex items-center gap-1">
      <img
        v-if="props.showBall && props.owned"
        v-tooltip="t('components.battle.Shlagemon.ownedTooltip')"
        src="/items/shlageball/shlageball.webp"
        alt="ball"
        class="h-4 w-4"
      >
      <span class="font-bold">{{ props.mon.base.name }}</span>
    </div>
    <UiProgressBar
      :value="props.hp"
      :max="maxHp"
      :color="props.color"
      class="mt-1 w-24"
      :class="{ flash: props.flash }"
    />
    <div class="w-full text-right text-sm">
      {{ props.hp.toLocaleString() }} / {{ maxHp.toLocaleString() }}
    </div>
  </div>
</template>

<style scoped>
.faint {
  animation: faint 0.6s ease forwards;
}

.dust {
  @apply absolute left-1/2 bottom-0 h-2 w-8 pointer-events-none opacity-0;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4), transparent);
  transform: translateX(-50%) scale(0.5);
}

.dust.active {
  animation: dust 0.6s forwards;
}

.lvl-up {
  animation: lvl-up 0.6s ease;
}

@keyframes faint {
  to {
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes dust {
  0% {
    opacity: 0.6;
    transform: translateX(-50%) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) scale(1.5);
  }
}

@keyframes lvl-up {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
