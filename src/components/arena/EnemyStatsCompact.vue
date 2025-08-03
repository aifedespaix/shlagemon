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
  <div class="flex items-center gap-4 rounded-lg bg-white p-3 shadow dark:bg-gray-800">
    <div class="h-16 w-16 flex-shrink-0">
      <ShlagemonImage
        :id="props.mon.base.id"
        :alt="props.mon.base.name"
        class="rounded object-contain"
      />
    </div>

    <div class="flex flex-grow flex-col overflow-hidden">
      <div class="flex items-center justify-between">
        <h3 class="truncate text-base font-bold">
          {{ props.mon.base.name }}
        </h3>
        <ShlagemonRarityInfo :rarity="props.mon.rarity" class="ml-2 flex-shrink-0" />
      </div>

      <div class="mt-1 flex gap-1">
        <ShlagemonType
          v-for="typeItem in props.mon.base.types"
          :key="typeItem.id"
          :value="typeItem"
          size="sm"
          open-on-click
        />
      </div>

      <div class="grid grid-cols-2 mt-2 gap-1 text-xs">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex justify-between"
        >
          <span class="text-gray-600 dark:text-gray-400">{{ stat.label }}</span>
          <span class="font-medium">{{ stat.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
