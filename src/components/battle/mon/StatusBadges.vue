<script setup lang="ts">
import type { ActiveEffect } from '~/type/effect'

interface Props {
  effects?: readonly ActiveEffect[]
  disease?: boolean
  diseaseRemaining?: number
}

const props = withDefaults(defineProps<Props>(), {
  effects: () => [],
  disease: false,
  diseaseRemaining: 0,
})

const emit = defineEmits<{ (e: 'showTypeChart', effect: ActiveEffect): void }>()

const now = ref(Date.now())
const { pause } = useIntervalFn(() => (now.value = Date.now()), 1000)
onUnmounted(pause)
</script>

<template>
  <div class="absolute left-0 top-2 z-150 flex flex-col gap-1">
    <BattleEffectBadge
      v-for="e in props.effects"
      :key="e.id"
      :effect="e"
      :now="now"
      @click="emit('showTypeChart', e)"
    />
    <BattleDiseaseBadge v-if="props.disease" :remaining="props.diseaseRemaining" />
  </div>
</template>
