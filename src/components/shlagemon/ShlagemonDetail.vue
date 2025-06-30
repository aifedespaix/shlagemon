<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import ProgressBar from '~/components/ui/ProgressBar.vue'
import { xpForLevel } from '~/utils/dexFactory'

const props = defineProps<{ mon: DexShlagemon | null }>()

const statColors = [
  'bg-red-200 dark:bg-red-700',
  'bg-emerald-200 dark:bg-emerald-700',
  'bg-blue-200 dark:bg-blue-700',
  'bg-amber-200 dark:bg-amber-700',
  'bg-violet-200 dark:bg-violet-700',
  'bg-pink-200 dark:bg-pink-700',
]

const stats = computed(() => {
  if (!props.mon)
    return []
  return [
    { label: 'HP', value: props.mon.hp },
    { label: 'Attaque', value: props.mon.attack },
    { label: 'Défense', value: props.mon.defense },
    { label: 'Puanteur', value: props.mon.smelling },
  ]
})

const maxXp = computed(() => props.mon ? xpForLevel(props.mon.lvl) : 0)
// const xpLeft = computed(() => props.mon ? maxXp.value - props.mon.xp : 0)
</script>

<template>
  <div v-if="mon" class="max-w-sm w-full rounded bg-white dark:bg-gray-900">
    <h2 class="mb-2 flex items-center justify-between text-lg font-bold">
      <div>
        {{ mon.base.name }} - lvl {{ mon.lvl }}
      </div>
      <ShlagemonRarity :rarity="mon.rarity" class="rounded-tr-0 -m-r-4 -m-t-4" />
    </h2>
    <img :src="`/shlagemons/${mon.base.id}/${mon.base.id}.png`" :alt="mon.base.name" class="mx-auto mb-2 max-h-40 object-contain">
    <p class="mb-4 max-h-25 overflow-auto text-sm italic -m-r-4">
      {{ mon.base.description }}
    </p>
    <div class="grid grid-cols-2 gap-2 text-sm">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="flex flex-col items-center rounded p-2 text-gray-900 transition-colors dark:text-white"
        :class="statColors[i % statColors.length]"
        hover="opacity-80"
      >
        <span class="font-semibold">{{ stat.label }}</span>
        <span class="text-base">{{ stat.value }}</span>
      </div>
    </div>
    <div class="mt-4">
      <div class="mb-1 text-center text-sm">
        Expérience : {{ mon.xp }} / {{ maxXp }}
      </div>
      <ProgressBar :value="mon.xp" :max="maxXp" class="w-full" />
    </div>
  </div>
</template>
