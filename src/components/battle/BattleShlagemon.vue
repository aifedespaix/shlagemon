<script setup lang="ts">
import type { ActiveEffect } from '~/type/effect'
import type { DexShlagemon } from '~/type/shlagemon'
import { useTypeChartModalStore } from '~/stores/typeChartModal'
import DiseaseBadge from './DiseaseBadge.vue'
import EffectBadge from './EffectBadge.vue'

interface Props {
  mon: DexShlagemon
  hp: number
  color?: string
  flipped?: boolean
  fainted?: boolean
  levelPosition?: 'top' | 'bottom'
  showBall?: boolean
  owned?: boolean
  effects?: ActiveEffect[]
  disease?: boolean
  diseaseRemaining?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: undefined,
  flipped: false,
  fainted: false,
  levelPosition: 'bottom',
  showBall: false,
  owned: false,
  effects: () => [],
  disease: false,
  diseaseRemaining: 0,
})

const emit = defineEmits<{ (e: 'faintEnd'): void }>()
const typeChart = useTypeChartModalStore()

const now = ref(Date.now())
const timer = window.setInterval(() => {
  now.value = Date.now()
}, 1000)
onUnmounted(() => window.clearInterval(timer))

function onAnimationEnd() {
  if (props.fainted)
    emit('faintEnd')
}

function showTypeChart() {
  const type = props.mon.base.types[0]
  if (type)
    typeChart.open(type.id)
}
</script>

<template>
  <div
    class="relative h-full flex flex-1 flex-col items-center"
    :class="{ 'saturate-10 contrast-200': props.disease }"
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
    <ShlagemonImage
      :id="props.mon.base.id"
      :alt="props.mon.base.name"
      :shiny="props.mon.isShiny"
      class="min-h-25 flex-1"
      :class="[props.flipped ? '-scale-x-100' : '', { faint: props.fainted }]"
      @animationend="onAnimationEnd"
    />
    <div class="absolute left-0 text-sm font-bold" :class="props.levelPosition === 'top' ? 'top-0' : 'bottom-0'">
      lvl {{ props.mon.lvl }}
    </div>
    <div class="mt-1 flex items-center gap-1">
      <UiTooltip text="Vous possédez déjà ce Shlagémon">
        <img
          v-if="props.showBall && props.owned"
          src="/items/shlageball/shlageball.png"
          alt="ball"
          class="h-4 w-4"
        >
      </UiTooltip>
      <span class="font-bold">{{ props.mon.base.name }}</span>
    </div>
    <ProgressBar :value="props.hp" :max="props.mon.hp" :color="props.color" class="mt-1 w-24" />
    <div class="w-full text-right text-sm">
      {{ props.hp }} / {{ props.mon.hp }}
    </div>
  </div>
</template>

<style scoped>
.faint {
  animation: faint 0.6s ease forwards;
}

@keyframes faint {
  to {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
