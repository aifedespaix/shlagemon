<script setup lang="ts">
const props = withDefaults(defineProps<{ value: number, duration?: number, precision?: number }>(), {
  duration: 300,
  precision: 0,
})

const MAX_DURATION = 660

const factor = computed(() => 10 ** props.precision)
const target = computed(() => Math.round(props.value * factor.value))
const source = ref(target.value)

watch(target, (val) => {
  source.value = val
})

const pulsing = ref(false)
const { start: stopPulse } = useTimeoutFn(() => (pulsing.value = false), 300, {
  immediate: false,
})

const displayValue = useTransition(source, {
  duration: () => Math.min(props.duration, MAX_DURATION),
  onFinished: () => {
    pulsing.value = true
    stopPulse()
  },
})

const formatted = computed(() => {
  const value = Math.round(displayValue.value) / factor.value
  return value.toLocaleString(undefined, {
    minimumFractionDigits: props.precision,
    maximumFractionDigits: props.precision,
  })
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
