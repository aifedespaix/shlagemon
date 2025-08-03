<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string
  alt: string
  shiny?: boolean
}>(), {
  shiny: false,
})
</script>

<template>
  <UiImageByBackground
    :src="`/shlagemons/${props.id}/${props.id}.webp`"
    :alt="props.alt"
    class="h-full max-w-sm w-full"
    :style="props.shiny ? { filter: 'hue-rotate(180deg)' } : {}"
    v-bind="$attrs"
  />
</template>
