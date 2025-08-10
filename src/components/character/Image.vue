<script setup lang="ts">
const props = defineProps<{
  id: string
  alt: string
}>()

const src = `/characters/${props.id}/${props.id}.webp`
</script>

<template>
    <UiSmartPicture
      :src="src"
      :alt="props.alt"
      :widths="[512, 1024]"
      sizes="(max-width: 640px) 100vw, 256px"
      fit="contain"
      class="h-full w-full"
      v-bind="$attrs"
    />
</template>
