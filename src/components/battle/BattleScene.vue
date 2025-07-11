<script setup lang="ts">
import AttackCursor from '~/components/battle/AttackCursor.vue'

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

const dex = useShlagedexStore()

interface Props {
  showAttackCursor?: boolean
  cursorX?: number
  cursorY?: number
  cursorClicked?: boolean
}
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <slot name="header" />
    <div class="relative max-w-160 w-full flex flex-1 items-center justify-center gap-4">
      <slot name="player" />
      <div class="vs font-bold">
        VS
      </div>
      <div
        class="relative h-full w-full flex-1"
        @click="e => emit('click', e)"
        @mousemove="e => emit('mousemove', e)"
        @mouseenter="emit('mouseenter')"
        @mouseleave="emit('mouseleave')"
      >
        <slot name="enemy" />
        <AttackCursor
          v-if="props.showAttackCursor"
          :x="props.cursorX"
          :y="props.cursorY"
          :clicked="props.cursorClicked"
        />
      </div>
    </div>
    <slot />
    <ShlagemonXpBar
      v-if="dex.activeShlagemon"
      class="max-w-160 w-full self-center"
      :mon="dex.activeShlagemon"
    />
  </div>
</template>
