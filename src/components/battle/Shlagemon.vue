<script setup lang="ts">
import type { ActiveEffect } from '~/type/effect'
import type { DexShlagemon } from '~/type/shlagemon'

interface Props {
  mon: DexShlagemon
  hp: number
  color?: string
  flipped?: boolean
  fainted?: boolean
  flash?: boolean
  levelPosition?: 'top' | 'bottom'
  showBall?: boolean
  owned?: boolean
  ownsRarity100?: boolean
  ownsShiny?: boolean
  belongsToPlayer?: boolean
  effects?: ActiveEffect[]
  disease?: boolean
  diseaseRemaining?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'faintEnd'): void }>()
</script>

<template>
  <BattleMonContainer v-bind="props" @faint-end="emit('faintEnd')" />
</template>
