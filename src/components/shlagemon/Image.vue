<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string
  alt?: string
  shiny?: boolean
  widths?: number[]
  formats?: Array<'avif' | 'webp' | 'png'>
}>(), {
  alt: '',
  widths: () => [512, 1024],
  formats: () => ['avif', 'webp'],
})

const src = computed(() => `/shlagemons/${props.id}/${props.id}.webp`)
</script>

<template>
  <UiSmartPicture
    :src="src"
    :alt="props.alt"
    :widths="props.widths"
    :formats="props.formats"
    sizes="(max-width:640px) 100vw, 384px"
    class="h-full max-w-sm w-full"
    :class="{ 'is-shiny': props.shiny }"
  />
</template>

<style scoped>
.is-shiny :deep(img) {
  filter: hue-rotate(180deg);
}
</style>
