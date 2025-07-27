<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
  sizes?: string
}>()

const webpSrc = computed(() => props.src.replace(/\.[a-z]+$/i, '.webp'))
</script>

<template>
  <picture>
    <source :srcset="webpSrc" type="image/webp" :sizes="props.sizes">
    <img :src="props.src" :alt="props.alt" :sizes="props.sizes" v-bind="$attrs">
  </picture>
</template>
