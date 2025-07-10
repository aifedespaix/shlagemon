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
  <ImageByBackground
    :src="`/shlagemons/${props.id}/${props.id}.webp`"
    draggable="false"
    :alt="props.alt"
    class="h-full w-full"
    :style="props.shiny ? { filter: 'hue-rotate(180deg)' } : {}"
    v-bind="$attrs"
  />
</template>
