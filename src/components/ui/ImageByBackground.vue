<script setup lang="ts">
const props = defineProps<{ 
  src: string, 
  isCover?: boolean,
  noAnimation?: boolean
}>()

function imgByBackground(background: string) {
  return {
    backgroundImage: `url(${background})`,
  }
}

const classes = computed(() => {
  const uno: string[] = []
  if(!props.noAnimation)
    uno.push('animate-fade-in')
  if (props.isCover)
    uno.push('bg-cover')
  else
    uno.push('bg-contain')
  return uno.join(' ')
})
</script>

<template>
  <div class="bg-center bg-no-repeat" :class="classes" :style="imgByBackground(props.src)" />
</template>
