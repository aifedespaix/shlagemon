<script setup lang="ts">
const props = defineProps<{
  id: string
  alt: string
}>()
</script>

<template>
  <div class="aspect-square w-12">
    <UiImageByBackground :src="`/characters/${props.id}/${props.id}.png`" :alt="props.alt" class="object-contain" v-bind="$attrs" />
  </div>
</template>
