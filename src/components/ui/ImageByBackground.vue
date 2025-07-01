<script setup lang="ts">
const props = defineProps<{ src: string }>()

function imgByBackground(background: string) {
  return {
    backgroundImage: `url(${background})`,
  }
}
</script>

<template>
  <div class="bg-contain bg-center bg-no-repeat" md="min-h-auto" :style="imgByBackground(props.src)" />
</template>
