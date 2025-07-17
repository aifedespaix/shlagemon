<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import ShlagemonStats from '~/components/shlagemon/Stats.vue'

const props = defineProps<{ mon: DexShlagemon }>()

const stats = computed(() => [
  { label: 'HP', value: props.mon.hp },
  { label: 'Attaque', value: props.mon.attack },
  { label: 'Défense', value: props.mon.defense },
  { label: 'Puanteur', value: props.mon.smelling },
])
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <h3 class="text-center text-lg font-bold">
      {{ props.mon.base.name }}
    </h3>
    <div class="h-24 w-24">
      <ShlagemonImage :id="props.mon.base.id" :alt="props.mon.base.name" class="object-contain" />
    </div>
    <div class="flex gap-1">
      <ShlagemonType v-for="t in props.mon.base.types" :key="t.id" :value="t" open-on-click />
    </div>
    <ShlagemonStats :stats="stats" />
  </div>
</template>
