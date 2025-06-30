<script lang="ts" setup>
const props = defineProps<{ rarity: number }>()

const classes = computed(() => {
  const unocss: string[] = []
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
  else {
    unocss.push('gold-300 dark:gold-800')
  }
  return unocss.join(' ')
})
</script>

<template>
  <div :class="classes" class="aspect-square h-10 w-10 flex items-center justify-center rounded-full px-2 py-1">
    {{ rarity }}
  </div>
</template>
