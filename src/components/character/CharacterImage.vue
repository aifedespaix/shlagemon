<script setup lang="ts">
const props = defineProps<{
  id: string
  alt: string
}>()
</script>

<template>
  <img :src="`/characters/${props.id}/${props.id}.png`" :alt="props.alt" class="object-contain" v-bind="$attrs">
</template>
