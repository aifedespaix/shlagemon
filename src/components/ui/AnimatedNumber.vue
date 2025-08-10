<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import NumberAnimation from 'vue-number-animation'

type EasingName = 'linear' | 'easeInOutCubic' | 'easeOutCubic' | 'easeInCubic'

interface Props {
  value: number
  duration?: number          // en ms côté wrapper (on convertit en s pour le lib)
  precision?: number
  locale?: string | readonly string[]
  useGrouping?: boolean      // <-- manquait !
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

/** on mémorise la dernière valeur cible utilisée comme 'from' du prochain run */
const lastTo = ref<number>(props.value)
const fromVal = ref<number>(props.value)
const toVal = ref<number>(props.value)

/** force un remount de <NumberAnimation> pour garantir un redéclenchement */
const runKey = ref(0)

/** converti ms -> s pour le composant externe */
const durationSec = computed(() =>
 Math.max(0, props.duration) / 1000,
)

watch(
  () => props.value,
  (next) => {
    fromVal.value = lastTo.value
    toVal.value = next
    lastTo.value = next
    runKey.value++              // force le remount -> relance l’animation
    // logs réactifs (tu verras bien le from != to maintenant)
    // eslint-disable-next-line no-console
    console.log('[NumberWrap] from→to', fromVal.value, toVal.value, 'duration(s)=', durationSec.value)
  },
  { immediate: true },
)

function onFinished(finalValue: number) {
  emit('finished', finalValue)
}
</script>

<template>
  <NumberAnimation
    :key="runKey"
    :from="fromVal"
    :to="toVal"
    :format="formatFn"
    :duration="durationSec"
    :autoplay="props.autoplay"
    :easing="props.easing"
    @finished="onFinished"
  />
</template>
