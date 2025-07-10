<script setup lang="ts">
const props = defineProps<{ src: string, isCover?: boolean }>()

function imgByBackground(background: string) {
  return {
    backgroundImage: `url(${background})`,
  }
}

const classes = computed(() => {
  const uno: string[] = []
  if (props.isCover)
    uno.push('bg-cover')
  else
    uno.push('bg-contain')
  return uno.join(' ')
})
</script>

<template>
  <div class="bg-center bg-no-repeat" :class="classes" md="" :style="imgByBackground(props.src)" />
</template>
