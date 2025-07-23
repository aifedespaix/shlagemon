<script setup lang="ts">
const props = defineProps<{
  id: string
  alt: string
}>()
</script>

<template>
  <div class="aspect-square">
    <UiImageByBackground :src="`/characters/${props.id}/${props.id}.webp`" :alt="props.alt" class="h-full w-full object-contain" v-bind="$attrs" />
  </div>
</template>
