<script setup lang="ts">
const props = withDefaults(defineProps<{ value: number, duration?: number, precision?: number }>(), {
  duration: 300,
  precision: 0,
})

const MAX_DURATION = 660
const MIN_STEP_TIME = 20

const factor = computed(() => 10 ** props.precision)
const displayValue = ref(Math.round(props.value * factor.value))
const formatted = computed(() => {
  return (displayValue.value / factor.value).toLocaleString(undefined, {
    minimumFractionDigits: props.precision,
    maximumFractionDigits: props.precision,
  })
})
const pulsing = ref(false)
const { start: stopPulse } = useTimeoutFn(() => (pulsing.value = false), 300, {
  immediate: false,
})
let interval: ReturnType<typeof useIntervalFn> | undefined

watch(
  () => props.value,
  (val, old) => {
    if (old === undefined) {
      displayValue.value = Math.round(val * factor.value)
      return
    }
    if (interval)
      interval.pause()
    const target = Math.round(val * factor.value)
    const diff = target - displayValue.value
    const sign = Math.sign(diff)
    let steps = Math.abs(diff)
    if (!steps)
      return

    const desiredDuration = Math.min(props.duration, MAX_DURATION)

    let stepValue = sign
    if (steps * MIN_STEP_TIME > desiredDuration) {
      steps = Math.floor(desiredDuration / MIN_STEP_TIME)
      steps = Math.max(1, steps)
      stepValue = Math.ceil(Math.abs(diff) / steps) * sign
    }

    const stepTime = Math.max(desiredDuration / steps, MIN_STEP_TIME)

    interval = useIntervalFn(() => {
      displayValue.value += stepValue
      if ((sign > 0 && displayValue.value >= target) || (sign < 0 && displayValue.value <= target)) {
        displayValue.value = target
        interval!.pause()
        pulsing.value = true
        stopPulse()
      }
    }, stepTime, { immediate: true })
  },
  { immediate: true },
)

onUnmounted(() => {
  interval?.pause()
})
</script>

<template>
  <span :class="pulsing ? 'count-pulse' : ''">{{ formatted }}</span>
</template>

<style scoped>
.count-pulse {
  animation: count-pulse 0.3s ease;
}
@keyframes count-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
