<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import ProgressBar from '~/components/ui/ProgressBar.vue'
import { xpForLevel } from '~/utils/dexFactory'

const props = defineProps<{ mon: DexShlagemon }>()

const maxXp = computed(() => xpForLevel(props.mon.lvl))
</script>

<template>
  <div>
    <div class="mb-1 text-center text-xs sm:text-sm">
      Expérience : {{ props.mon.xp.toLocaleString() }} / {{ maxXp.toLocaleString() }}
    </div>
    <ProgressBar :value="props.mon.xp" :max="maxXp" color="experience-bar" class="w-full" />
  </div>
</template>

<style scoped>
.experience-bar {
  background-image: linear-gradient(90deg, #4ade80, #67e8f9, #4ade80);
  background-size: 200% 100%;
  animation: xp-flow 4s linear infinite;
}

.dark .experience-bar {
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
</style>
