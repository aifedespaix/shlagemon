<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { xpForLevel } from '~/utils/dexFactory'

const props = defineProps<{ mon: DexShlagemon }>()

const maxXp = computed(() => xpForLevel(props.mon.lvl))
const isMaxLevel = computed(() => props.mon.lvl >= 100)
</script>

<template>
  <div class="flex flex-col">
    <div v-if="!isMaxLevel" class="mb-1 text-center text-xs">
      Expérience : {{ props.mon.xp.toLocaleString() }} / {{ maxXp.toLocaleString() }}
    </div>
    <UiProgressBar
      :value="isMaxLevel ? 1 : props.mon.xp"
      :max="isMaxLevel ? 1 : maxXp"
      xp
      :rainbow="isMaxLevel"
      class="w-full"
    />
  </div>
</template>
