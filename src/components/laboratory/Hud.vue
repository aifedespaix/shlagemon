<script setup lang="ts">
interface LaboratoryHudProps {
  progress?: number
  threshold?: number
  ready?: boolean
  reward?: number
}

const props = withDefaults(defineProps<LaboratoryHudProps>(), {
  progress: 0,
  threshold: 0,
  ready: false,
  reward: 0,
})

const { t, n } = useI18n()

const aimPosition = ref({ x: 50, y: 50 })

const safeThreshold = computed(() => Math.max(props.threshold, 1))
const normalizedProgress = computed(() => clamp(props.progress, 0, safeThreshold.value))
const progressPercentage = computed(() => (normalizedProgress.value / safeThreshold.value) * 100)
const remainingPoints = computed(() => Math.max(safeThreshold.value - normalizedProgress.value, 0))

const progressLabel = computed(() => t('components.panel.Laboratory.researchBar.progress', {
  current: n(normalizedProgress.value),
  total: n(safeThreshold.value),
}))

const statusLabel = computed(() => (props.ready
  ? t('components.panel.Laboratory.researchBar.ready')
  : t('components.panel.Laboratory.researchBar.remaining', { remaining: n(remainingPoints.value) })
))

const rewardLabel = computed(() => (props.reward > 0
  ? t('components.panel.Laboratory.researchBar.reward', { amount: n(props.reward) })
  : ''
))

const roundedProgress = computed(() => Math.round(normalizedProgress.value))
const barWidthStyle = computed(() => `${Math.min(Math.max(progressPercentage.value, 0), 100)}%`)

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function updateAim(position: { x: number, y: number }) {
  aimPosition.value = position
}

defineExpose({ updateAim })
</script>

<template>
  <div class="pointer-events-none absolute inset-0 select-none text-cyan-300/70">
    <div aria-hidden="true" class="absolute inset-0">
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
    </div>

    <div class="absolute inset-x-0 bottom-0 flex justify-center opacity-25">
      <div
        class="relative h-2 w-full overflow-hidden rounded-full bg-cyan-300/10"
        role="progressbar"
        :aria-label="t('components.panel.Laboratory.researchBar.title')"
        aria-valuemin="0"
        :aria-valuemax="safeThreshold"
        :aria-valuenow="roundedProgress"
        :aria-valuetext="statusLabel"
      >
        <div
          class="h-full rounded-full from-cyan-400 via-cyan-300 to-emerald-300 bg-gradient-to-r transition-[width] duration-500 ease-out"
          :style="{ width: barWidthStyle }"
        />
      </div>
    </div>
  </div>
</template>
