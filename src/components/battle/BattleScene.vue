<script setup lang="ts">
import AttackCursor from '~/components/battle/AttackCursor.vue'

interface Props {
  showAttackCursor?: boolean
  cursorX?: number
  cursorY?: number
  cursorClicked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showAttackCursor: false,
  cursorX: 0,
  cursorY: 0,
  cursorClicked: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'mousemove', event: MouseEvent): void
  (e: 'mouseenter'): void
  (e: 'mouseleave'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <slot name="header" />
    <div
      class="relative w-full flex flex-1 items-center justify-center gap-4"
      @click="e => emit('click', e)"
      @mousemove="e => emit('mousemove', e)"
      @mouseenter="emit('mouseenter')"
      @mouseleave="emit('mouseleave')"
    >
      <slot name="player" />
      <div class="vs font-bold">
        VS
      </div>
      <slot name="enemy" />
      <AttackCursor
        v-if="props.showAttackCursor"
        :x="props.cursorX"
        :y="props.cursorY"
        :clicked="props.cursorClicked"
      />
      <slot name="capture" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
:deep(.flash) {
  animation: flash 0.1s ease-in;
}
@keyframes flash {
  from {
    filter: brightness(2);
  }
  to {
    filter: brightness(1);
  }
}
</style>
