<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: number
  max: number
  color?: string
  xp?: boolean
  rainbow?: boolean
}>(), { xp: false, rainbow: false })

const percent = computed(() => props.max === 0 ? 0 : (props.value / props.max) * 100)
const gainAnim = ref(false)
const { start: stopGainAnim } = useTimeoutFn(() => (gainAnim.value = false), 400, { immediate: false })

watch(
  () => props.value,
  (val, old) => {
    if ((props.xp || props.rainbow) && val > old) {
      gainAnim.value = true
      stopGainAnim()
    }
  },
)

const barClass = computed(() => {
  if (props.rainbow)
    return 'rainbow-bar rainbow-aura'
  return props.xp ? 'xp-bar' : (props.color ?? 'bg-blue-800')
})
</script>

<template>
  <div class="h-2 w-full overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
    <div
      class="h-full transition-width duration-300"
      :class="[barClass, gainAnim ? 'xp-gain' : '']"
      :style="{ width: `${percent}%` }"
    />
  </div>
</template>

<style scoped>
.xp-bar {
  background-image: linear-gradient(90deg, #4ade80, #67e8f9, #4ade80);
  background-size: 200% 100%;
  animation: xp-flow 4s linear infinite;
}

.rainbow-bar {
  background: linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #3333ff, #ff00cc);
  background-size: 400% 100%;
  animation: rainbow-shift 5s linear infinite;
}

.rainbow-aura {
  box-shadow: 0 0 6px 2px rgba(255, 128, 255, 0.6);
}

.dark .rainbow-aura {
  box-shadow: 0 0 6px 2px rgba(255, 128, 255, 0.3);
}

.dark .xp-bar {
  background-image: linear-gradient(90deg, #166534, #0e7490, #166534);
}

@keyframes xp-flow {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: -200% 0%;
  }
}

.xp-gain {
  animation: xp-gain 0.4s ease;
}

@keyframes xp-gain {
  0% {
    transform: scaleY(1);
    box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7);
  }
  50% {
    transform: scaleY(1.2);
    box-shadow: 0 0 6px 2px rgba(250, 204, 21, 0.7);
  }
  100% {
    transform: scaleY(1);
    box-shadow: 0 0 0 0 rgba(250, 204, 21, 0);
  }
}

@keyframes rainbow-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
