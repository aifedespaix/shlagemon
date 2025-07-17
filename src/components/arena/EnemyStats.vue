<script setup lang="ts">
import type { BaseShlagemon } from '~/type/shlagemon'
import { useArenaStore } from '~/stores/arena'
import { createDexShlagemon } from '~/utils/dexFactory'

const props = defineProps<{ mon: BaseShlagemon }>()

const arena = useArenaStore()

const dexMon = computed(() => {
  const lvl = arena.arenaData?.level ?? 1
  const coefficientMultiplier = lvl / props.mon.coefficient
  return createDexShlagemon(props.mon, false, coefficientMultiplier, lvl)
})

const stats = computed(() => [
  { label: 'HP', value: dexMon.value.hp },
  { label: 'Attaque', value: dexMon.value.attack },
  { label: 'Défense', value: dexMon.value.defense },
  { label: 'Puanteur', value: dexMon.value.smelling },
])
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <h3 class="text-center text-lg font-bold">
      {{ props.mon.name }}
    </h3>
    <div class="h-24 w-24">
      <ShlagemonImage :id="props.mon.id" :alt="props.mon.name" class="object-contain" />
    </div>
    <div class="flex gap-1">
      <ShlagemonType v-for="t in props.mon.types" :key="t.id" :value="t" />
    </div>
    <div class="grid grid-cols-2 gap-2 text-sm">
      <div v-for="s in stats" :key="s.label" class="flex flex-col items-center">
        <span class="font-semibold">{{ s.label }}</span>
        <span>{{ s.value }}</span>
      </div>
    </div>
  </div>
</template>
