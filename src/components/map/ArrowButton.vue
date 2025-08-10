<script setup lang="ts">
const props = defineProps<{ direction: 'prev' | 'next', disabled?: boolean }>()
const emit = defineEmits<{ (e: 'click'): void }>()

const positionClass = computed(() => props.direction === 'prev' ? 'left-0 rounded-bl-0!' : 'right-0 rounded-br-0!')
const iconClass = computed(() => props.direction === 'prev' ? 'i-carbon:chevron-left' : 'i-carbon:chevron-right')
const translate = computed(() => props.direction === 'prev' ? '-100%' : '100%')
const { t } = useI18n()
const label = computed(() => t(`components.map.ArrowButton.${props.direction}`))
</script>

<template>
  <Transition name="fade-slide">
    <UiButton
      v-if="!disabled"
      v-tooltip="label"
      type="icon"
      :aria-label="label"
      class="absolute z-501 h-25 w-20 opacity-75 -bottom-1 hover:opacity-100" :class="[positionClass]"
      :style="{ '--dir': translate }"
      @click="emit('click')"
    >
      <div class="text-xl" :class="[iconClass]" />
    </UiButton>
  </Transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(var(--dir));
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
