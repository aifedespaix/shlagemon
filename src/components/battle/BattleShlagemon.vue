<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import ShlagemonImage from '~/components/shlagemon/ShlagemonImage.vue'
import ProgressBar from '~/components/ui/ProgressBar.vue'

interface Props {
  mon: DexShlagemon
  hp: number
  color?: string
  flipped?: boolean
  fainted?: boolean
  levelPosition?: 'top' | 'bottom'
}

const props = withDefaults(defineProps<Props>(), {
  color: undefined,
  flipped: false,
  fainted: false,
  levelPosition: 'bottom',
})

const emit = defineEmits<{ (e: 'faintEnd'): void }>()

function onAnimationEnd() {
  if (props.fainted)
    emit('faintEnd')
}
</script>

<template>
  <div class="relative w-full flex flex-col items-center">
    <ShlagemonImage
      :id="props.mon.base.id"
      :alt="props.mon.base.name"
      :shiny="props.mon.isShiny"
      class="max-h-32 object-contain"
      :class="[props.flipped ? '-scale-x-100' : '', { faint: props.fainted }]"
      @animationend="onAnimationEnd"
    />
    <div class="absolute left-0 text-sm font-bold" :class="props.levelPosition === 'top' ? 'top-0' : 'bottom-0'">
      lvl {{ props.mon.lvl }}
    </div>
    <div class="mt-1 flex items-center gap-1">
      <span class="font-bold">{{ props.mon.base.name }}</span>
      <!-- <ShlagemonType v-for="t in props.mon.base.types" :key="t.id" :value="t" size="xs" /> -->
    </div>
    <ProgressBar :value="props.hp" :max="props.mon.hp" :color="props.color" class="mt-1 w-24" />
    <div class="w-full text-right text-sm">
      {{ props.hp }} / {{ props.mon.hp }}
    </div>
  </div>
</template>

<style scoped>
.faint {
  animation: faint 0.5s forwards;
}

@keyframes faint {
  to {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
