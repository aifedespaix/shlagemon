<script setup lang="ts">
const { message, variant } = defineProps<{ message: string, variant?: 'high' | 'low' | 'normal' }>()
const variantClasses = computed(() => {
  switch (variant) {
    case 'high':
      return 'text-red-200 bg-red-800/25'
    case 'low':
      return 'text-blue-200 bg-blue-800/25'
    default:
      return 'bg-white/90 dark:bg-gray-800/90'
  }
})
const rotation = (Math.random() * 5 + 15) * (Math.random() > 0.5 ? 1 : -1)
</script>

<template>
  <div
    class="battle-toast pointer-events-none absolute bottom-20 left-1/2 z-100 -translate-x-1/2"
    :style="{ transform: `translateX(-50%) rotate(${rotation}deg)` }"
  >
    <div class="battle-toast-text rounded px-2 py-1 text-xs font-bold" :class="variantClasses">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
.battle-toast {
  animation: toast-pop 1.2s ease forwards;
}
.battle-toast-text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
@keyframes toast-pop {
  0% {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  80% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
}
</style>
