<script setup lang="ts">
import { computed } from 'vue'

type Fit = 'cover' | 'contain'

interface Props {
  src: string
  alt?: string
  widths?: number[]
  formats?: Array<'avif' | 'webp' | 'png' | 'jpg' | 'jpeg'>
  sizes?: string
  fit?: Fit
  aspect?: string | number
  noAnimation?: boolean
  priority?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  widths: () => [320, 640, 960, 1280, 1920],
  formats: () => ['avif', 'webp'],
  sizes: '(max-width: 768px) 100vw, 50vw',
  fit: 'contain',
  aspect: '',
  noAnimation: false,
  priority: false,
})

/** retire l’extension pour fabriquer base-wNNN.ext */
const basePath = computed(() =>
  props.src.replace(/\.(png|jpg|jpeg|webp|avif)$/i, ''),
)

function buildSrcSet(ext: string) {
  const max = props.widths[props.widths.length - 1]
  return props.widths.map((w) => {
    const suffix = w === max ? '' : `-w${w}`
    return `${basePath.value}${suffix}.${ext} ${w}w`
  }).join(', ')
}

const imgClass = computed(() => [
  'block w-full h-full',
  props.fit === 'cover' ? 'object-cover' : 'object-contain',
  props.noAnimation ? '' : 'animate-fade-in',
].join(' '))

const style = computed(() => {
  if (!props.aspect)
    return {}
  const ratio = typeof props.aspect === 'string' && props.aspect.includes('/')
    ? props.aspect
    : String(props.aspect)
  return { aspectRatio: ratio }
})

const loading = computed(() => (props.priority ? 'eager' : 'lazy'))
const decoding = computed(() => (props.priority ? 'sync' : 'async'))
</script>

<template>
  <!-- On propage class/style/… donnés au composant vers le <picture> -->
  <picture :style="style" v-bind="$attrs">
    <source
      v-for="fmt in props.formats"
      :key="fmt"
      :type="fmt === 'jpg' ? 'image/jpeg' : `image/${fmt}`"
      :srcset="buildSrcSet(fmt === 'jpg' ? 'jpg' : fmt)"
      :sizes="props.sizes"
    >
    <img
      :src="`${basePath}-w${props.widths[props.widths.length - 1]}.${props.formats[props.formats.length - 1]}`"
      :alt="props.alt"
      :class="imgClass"
      :loading="loading"
      :decoding="decoding"
      draggable="false"
    >
  </picture>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 0.4s ease both;
}
</style>
