<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const props = defineProps<{ mon: DexShlagemon, enemy?: boolean }>()
const { t } = useI18n()

const stats = computed(() => [
  { label: t('components.arena.EnemyStats.hp'), value: props.mon.hp },
  { label: t('components.arena.EnemyStats.attack'), value: props.mon.attack },
  { label: t('components.arena.EnemyStats.defense'), value: props.mon.defense },
  { label: t('components.arena.EnemyStats.smell'), value: props.mon.smelling },
])

const classes = computed(() => {
  const unocss: string[] = []
  if (props.enemy) {
    unocss.push('bg-red-500/50 dark:bg-red-900/50')
  }
  else {
    unocss.push('bg-blue-500/50 dark:bg-blue-900/50')
  }
  return unocss.join(' ')
})
</script>

<template>
  <div class="flex items-center gap-4 rounded-lg p-1 shadow" :class="classes">
    <div class="h-16 w-16 flex-shrink-0">
      <ShlagemonImage
        :id="props.mon.base.id"
        :alt="t(props.mon.base.name)"
        class="rounded object-contain"
      />
    </div>

    <div class="flex flex-grow flex-col overflow-hidden">
      <div class="flex items-center justify-between">
        <h3 class="truncate text-base font-bold">
          {{ t(props.mon.base.name) }}
          <span class="ml-1 text-sm text-gray-600 font-medium dark:text-gray-400">
            {{ t('components.arena.EnemyStats.level', { n: props.mon.lvl }) }}
          </span>
        </h3>
        <div class="flex gap-1">
          <ShlagemonType
            v-for="typeItem in props.mon.base.types"
            :key="typeItem.id"
            :value="typeItem"
            size="xs"
            open-on-click
          />
        </div>
        <ShlagemonRarityInfo :rarity="props.mon.rarity" small class="ml-2 flex-shrink-0" />
      </div>

      <div class="mt-1 flex gap-1" />

      <ShlagemonStats :stats="stats" compact />
    </div>
  </div>
</template>
