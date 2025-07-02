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
  <img
    :src="`/shlagemons/${props.id}/${props.id}.png`"
    :alt="props.alt"
    class="object-contain"
    :style="props.shiny ? { filter: 'hue-rotate(180deg)' } : {}"
    v-bind="$attrs"
  >
</template>
