<script setup lang="ts">
type EasingName = 'linear' | 'easeInOutCubic' | 'easeOutCubic' | 'easeInCubic'

interface Props {
  value: number
  duration?: number // en ms côté wrapper (on convertit en s pour le lib)
  precision?: number
  locale?: string | readonly string[]
  useGrouping?: boolean // <-- manquait !
  easing?: EasingName
  autoplay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 300,
  precision: 0,
  locale: undefined,
  useGrouping: true,
  easing: 'linear',
  autoplay: true,
})

const emit = defineEmits<{ (e: 'finished', finalValue: number): void }>()

/**
 * `vue-number-animation` relies on browser-specific globals and breaks during
 * server-side rendering. The component is therefore loaded dynamically only on
 * the client. When rendered on the server a formatted static number is
 * displayed instead of an animation.
 */
const NumberAnimationComponent = shallowRef<
  null | typeof import('vue-number-animation')['default']
    >(null)

if (!import.meta.env.SSR) {
  import('vue-number-animation').then((mod) => {
    NumberAnimationComponent.value = mod.default
  })
}

// const prefersReduced = usePreferredReducedMotion()

const precision = computed(() => Math.min(Math.max(props.precision, 0), 6))
const numberFmt = computed(() => new Intl.NumberFormat(
  props.locale as Intl.LocalesArgument | undefined,
  {
    minimumFractionDigits: precision.value,
    maximumFractionDigits: precision.value,
    useGrouping: props.useGrouping,
  },
))
const formatFn = (n: number) => numberFmt.value.format(n)

const lastTo = ref<number>(props.value)
const fromVal = ref<number>(props.value)
const toVal = ref<number>(props.value)

const runKey = ref(0)
const currentDuration = ref(props.duration)
const lastStart = ref(0)

/**
 * Avoid overlapping animations by skipping when updates occur faster than the
 * configured duration.
 */

const durationSec = computed(() => Math.max(0, currentDuration.value) / 1000)

watch(
  () => props.value,
  (next) => {
    const now = Date.now()
    if (now - lastStart.value < props.duration) {
      fromVal.value = next
      toVal.value = next
      lastTo.value = next
      currentDuration.value = 0
      runKey.value++
      return
    }

    fromVal.value = lastTo.value
    toVal.value = next
    lastTo.value = next
    currentDuration.value = props.duration
    lastStart.value = now
    runKey.value++
  },
  { immediate: true },
)

function onFinished(finalValue: number) {
  emit('finished', finalValue)
}
</script>

<template>
  <component
    :is="NumberAnimationComponent"
    v-if="NumberAnimationComponent"
    :key="runKey"
    :from="fromVal"
    :to="toVal"
    :format="formatFn"
    :duration="durationSec"
    :autoplay="props.autoplay"
    :easing="props.easing"
    @finished="onFinished"
  />
  <span v-else>{{ formatFn(toVal) }}</span>
</template>
