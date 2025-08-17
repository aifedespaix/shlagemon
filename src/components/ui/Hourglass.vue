<script setup lang="ts">
interface Props {
  /** Active ou désactive l’animation */
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  animated: true,
})
</script>

<template>
  <div
    class="i-game-icons:hourglass text-2xl"
    :class="{ 'animate-hourglass': props.animated }"
    aria-hidden="true"
  />
</template>

<style scoped>
.animate-hourglass {
  display: inline-block;
  animation: load 2s infinite ease-in-out;
}

@keyframes load {
  0% {
    transform: scale(1) rotate(0deg);
  }
  10% {
    transform: scale(1.2) rotate(0deg);
  }
  25% {
    transform: scale(1) rotate(180deg);
  }
  60% {
    transform: scale(1.2) rotate(180deg);
  }
  75% {
    transform: scale(1) rotate(360deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>
