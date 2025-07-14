<script setup lang="ts">
const { message, variant } = defineProps<{ message: string, variant?: 'high' | 'low' | 'normal' }>()
const variantClasses = computed(() => {
  switch (variant) {
    case 'high':
      return 'bg-red-500 text-white border-yellow-300 shadow-lg dark:bg-red-600'
    case 'low':
      return 'bg-blue-200 text-blue-800 border-blue-300 shadow-inner dark:bg-blue-900/80 dark:text-blue-200'
    default:
      return 'bg-white/90 dark:bg-gray-800/90'
  }
})
const rotation = (Math.random() * 5 + 15) * (Math.random() > 0.5 ? 1 : -1)
</script>

<template>
  <div
    class="battle-toast pointer-events-none absolute left-1/2 z-100 -top-6 -translate-x-1/2"
    :style="{ transform: `translateX(-50%) rotate(${rotation}deg)` }"
  >
    <div class="border rounded px-2 py-1 text-xs font-bold" :class="variantClasses">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
.battle-toast {
  animation: toast-pop 0.3s ease;
}
@keyframes toast-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
