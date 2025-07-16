<script lang="ts" setup>
const props = defineProps<{ rarity: number }>()

const classes = computed(() => {
  const unocss: string[] = []
  unocss.push('text-grey-900 dark:text-grey-300')
  if (props.rarity < 10) {
    unocss.push('bg-grey-300 bg-dark:grey-800')
  }
  else if (props.rarity < 50) {
    unocss.push('bg-blue-300 dark:bg-blue-800')
  }
  else if (props.rarity < 75) {
    unocss.push('bg-purple-300 dark:bg-purple-800')
  }
  else if (props.rarity < 90) {
    unocss.push('bg-emerald-300 dark:bg-emerald-800')
  }
  else if (props.rarity < 100) {
    unocss.push('bg-yellow-300 dark:bg-yellow-800')
  }
  else {
    unocss.push('bg-yellow-300 dark:bg-yellow-800 rarity-max')
  }
  return unocss.join(' ')
})
</script>

<template>
  <div :class="classes" class="aspect-square h-10 w-10 flex items-center justify-center rounded-full px-2 py-1">
    {{ rarity }}
  </div>
</template>

<style scoped>
.rarity-max {
  position: relative;
  animation: rarity-aura 2s ease-in-out infinite;
  box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.8);
}

@keyframes rarity-aura {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.8);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(255, 215, 0, 0.4);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.8);
  }
}
</style>
