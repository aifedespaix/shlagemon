<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const props = defineProps<{ mon: DexShlagemon }>()
const { t } = useI18n()

const stats = computed(() => [
  { label: t('components.arena.EnemyStats.hp'), value: props.mon.hp },
  { label: t('components.arena.EnemyStats.attack'), value: props.mon.attack },
  { label: t('components.arena.EnemyStats.defense'), value: props.mon.defense },
  { label: t('components.arena.EnemyStats.smell'), value: props.mon.smelling },
])
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <h3 class="w-full flex items-center justify-between text-lg font-bold">
      <span class="flex-1 text-center">{{ props.mon.base.name }}</span>
      <ShlagemonRarityInfo :rarity="props.mon.rarity" />
    </h3>
    <div class="h-24 w-24">
      <ShlagemonImage :id="props.mon.base.id" :alt="props.mon.base.name" class="object-contain" />
    </div>
    <div class="flex gap-1">
      <ShlagemonType
        v-for="typeItem in props.mon.base.types"
        :key="typeItem.id"
        :value="typeItem"
        open-on-click
      />
    </div>
    <ShlagemonStats :stats="stats" />
  </div>
</template>
