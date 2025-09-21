<script setup lang="ts">
import { storeToRefs } from 'pinia'

const laboratory = useLaboratoryStore()
const { t } = useI18n()
const { researchProgress, legendaryBattleThreshold, isResearchReady, hitsUntilNextLegendary } = storeToRefs(laboratory)
const researchPointReward = computed(() => laboratory.researchPointReward)

const progressTotal = computed(() => {
  const threshold = legendaryBattleThreshold.value
  return threshold <= 0 ? 1 : threshold
})

const progressValue = computed(() => {
  if (legendaryBattleThreshold.value <= 0)
    return progressTotal.value
  return Math.min(researchProgress.value, progressTotal.value)
})

const progressPercent = computed(() => {
  if (progressTotal.value <= 0)
    return 100
  return Math.min((progressValue.value / progressTotal.value) * 100, 100)
})

const progressSummary = computed(() => t('components.laboratory.Hud.progress', {
  current: progressValue.value,
  total: progressTotal.value,
}))

const statusLabel = computed(() => {
  if (isResearchReady.value)
    return t('components.laboratory.Hud.ready')
  const remaining = Math.max(0, hitsUntilNextLegendary.value)
  return t('components.laboratory.Hud.researching', { remaining })
})

const rewardLabel = computed(() => t('components.laboratory.Hud.reward', {
  value: researchPointReward.value,
}))

const progressBarValue = computed(() => progressValue.value)
const progressBarMax = computed(() => progressTotal.value)

const aimPosition = ref({ x: 50, y: 50 })

function updateAim(position: { x: number, y: number }) {
  aimPosition.value = position
}

defineExpose({ updateAim })
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 select-none text-cyan-300/70"
    aria-hidden="true"
  >
    <div class="absolute inset-x-0 top-0 h-24 from-cyan-400/10 via-cyan-300/5 to-transparent bg-gradient-to-b" />
    <div class="absolute inset-x-0 bottom-0 h-28 from-cyan-400/10 via-cyan-300/5 to-transparent bg-gradient-to-t" />

    <div class="absolute inset-y-0 left-0 w-20 from-cyan-400/8 via-cyan-300/4 to-transparent bg-gradient-to-r" />
    <div class="absolute inset-y-0 right-0 w-20 from-cyan-400/8 via-cyan-300/4 to-transparent bg-gradient-to-l" />

    <div class="absolute inset-0">
      <div class="absolute left-8 top-10 h-10 w-24 border-b border-l border-cyan-400/30" />
      <div class="absolute right-8 top-10 h-10 w-24 border-b border-r border-cyan-400/30" />
      <div class="absolute bottom-10 left-8 h-10 w-24 border-r border-t border-cyan-400/30" />
      <div class="absolute bottom-10 right-8 h-10 w-24 border-l border-t border-cyan-400/30" />
    </div>

    <div
      class="absolute h-28 w-28"
      :style="{
        left: `${aimPosition.x}%`,
        top: `${aimPosition.y}%`,
        transform: 'translate(-50%, -50%)',
      }"
    >
      <div class="absolute inset-0 border border-cyan-300/40 rounded-full" />
      <div class="absolute inset-4 border border-cyan-300/25 rounded-full" />
      <div class="absolute left-1/2 top-0 h-8 w-px bg-cyan-200/60 -translate-x-1/2" />
      <div class="absolute bottom-0 left-1/2 h-8 w-px bg-cyan-200/60 -translate-x-1/2" />
      <div class="absolute left-0 top-1/2 h-px w-8 bg-cyan-200/60 -translate-y-1/2" />
      <div class="absolute right-0 top-1/2 h-px w-8 bg-cyan-200/60 -translate-y-1/2" />
      <div class="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-cyan-100/80 -translate-x-1/2 -translate-y-1/2" />
    </div>

    <div
      class="absolute h-44 w-44"
      :style="{
        left: `${aimPosition.x}%`,
        top: `${aimPosition.y}%`,
        transform: 'translate(-50%, -50%)',
      }"
    >
      <div class="absolute inset-0 border border-cyan-300/25 border-dashed" />
      <div class="absolute left-1/2 top-0 h-10 w-px from-transparent via-cyan-200/40 to-transparent bg-gradient-to-b -translate-x-1/2" />
      <div class="absolute bottom-0 left-1/2 h-10 w-px from-transparent via-cyan-200/40 to-transparent bg-gradient-to-b -translate-x-1/2" />
      <div class="absolute left-0 top-1/2 h-px w-10 from-transparent via-cyan-200/40 to-transparent bg-gradient-to-r -translate-y-1/2" />
      <div class="absolute right-0 top-1/2 h-px w-10 from-transparent via-cyan-200/40 to-transparent bg-gradient-to-r -translate-y-1/2" />
    </div>

    <div class="absolute inset-0">
      <div class="absolute left-1/4 top-12 h-16 w-px from-cyan-200/40 via-cyan-200/10 to-transparent bg-gradient-to-b" />
      <div class="absolute right-1/4 top-12 h-16 w-px from-cyan-200/40 via-cyan-200/10 to-transparent bg-gradient-to-b" />
      <div class="absolute bottom-12 left-1/4 h-16 w-px from-transparent via-cyan-200/10 to-cyan-200/40 bg-gradient-to-b" />
      <div class="absolute bottom-12 right-1/4 h-16 w-px from-transparent via-cyan-200/10 to-cyan-200/40 bg-gradient-to-b" />
    </div>

    <div class="absolute inset-x-0 bottom-0 px-4 pb-6">
      <div class="mx-auto max-w-4xl w-full">
        <div class="border border-cyan-300/30 rounded-xl bg-slate-950/70 px-5 py-4 shadow-lg backdrop-blur">
          <div class="flex items-center justify-between text-xs text-cyan-200/70 tracking-[0.28em] uppercase">
            <span>{{ t('components.laboratory.Hud.title') }}</span>
            <span class="text-[0.7rem] text-cyan-100/80 tracking-normal">{{ progressSummary }}</span>
          </div>
          <div
            class="mt-3 h-2 rounded-full bg-cyan-300/10"
            role="progressbar"
            :aria-valuemin="0"
            :aria-valuenow="progressBarValue"
            :aria-valuemax="progressBarMax"
            :aria-valuetext="progressSummary"
          >
            <div
              class="h-full rounded-full from-cyan-200 via-cyan-300 to-cyan-100 bg-gradient-to-r transition-[width] duration-500 ease-out"
              :style="{ width: `${progressPercent}%` }"
            />
          </div>
          <div class="mt-3 flex items-center justify-between text-[0.68rem] text-cyan-100/80">
            <span>{{ statusLabel }}</span>
            <span>{{ rewardLabel }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
