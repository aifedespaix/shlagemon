<script setup lang="ts">
const { message } = defineProps<{ message: string }>()
const rotation = (Math.random() * 5 + 15) * (Math.random() > 0.5 ? 1 : -1)
</script>

<template>
  <div
    class="battle-toast pointer-events-none absolute left-1/2 -top-6 -translate-x-1/2"
    :style="{ transform: `translateX(-50%) rotate(${rotation}deg)` }"
  >
    <div class="rounded bg-white/90 px-2 py-1 text-xs font-bold shadow dark:bg-gray-800/90">
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
