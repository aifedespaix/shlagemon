<script setup lang="ts">
interface Props {
  level: number
  pulsing?: boolean
}
const props = withDefaults(defineProps<Props>(), { pulsing: false })
</script>

<template>
  <div class="text-sm font-bold" :class="{ 'lvl-up': props.pulsing }">
    lvl {{ props.level }}
  </div>
</template>

<style scoped>
.lvl-up {
  animation: lvl-up 0.6s ease;
}
@keyframes lvl-up {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
