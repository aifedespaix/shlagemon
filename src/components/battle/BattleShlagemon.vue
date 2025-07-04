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
  showBall?: boolean
  owned?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: undefined,
  flipped: false,
  fainted: false,
  levelPosition: 'bottom',
  showBall: false,
  owned: false,
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
      <Tooltip text="Vous avez déjà capturé ce Shlagémon">
        <img
          v-if="props.showBall && props.owned"
          src="/items/shlageball/shlageball.png"
          alt="ball"
          class="h-4 w-4"
        >
      </Tooltip>
      <span class="font-bold">{{ props.mon.base.name }}</span>
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
