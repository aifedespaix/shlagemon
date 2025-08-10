<script setup lang="ts">
interface Props {
  id: string
  alt: string
  shiny?: boolean
  flipped?: boolean
  fainted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shiny: false,
  flipped: false,
  fainted: false,
})

const emit = defineEmits<{ (e: 'faintAnimEnd'): void }>()
function onAnimationEnd() {
  emit('faintAnimEnd')
}
</script>

<template>
  <div class="relative">
    <ShlagemonImage
      :id="props.id"
      :alt="props.alt"
      :shiny="props.shiny"
      class="min-h-25"
      :class="[props.flipped ? '-scale-x-100' : '', { faint: props.fainted }]"
      @animationend="onAnimationEnd"
    />
    <div class="dust" :class="{ active: props.fainted }" />
  </div>
</template>

<style scoped>
.faint {
  animation: faint 0.6s ease forwards;
}
.dust {
  @apply absolute left-1/2 bottom-0 h-2 w-8 pointer-events-none opacity-0;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4), transparent);
  transform: translateX(-50%) scale(0.5);
}
.dust.active {
  animation: dust 0.6s forwards;
}
@keyframes faint {
  to {
    transform: scale(0);
    opacity: 0;
  }
}
@keyframes dust {
  0% {
    opacity: 0.6;
    transform: translateX(-50%) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) scale(1.5);
  }
}
</style>
