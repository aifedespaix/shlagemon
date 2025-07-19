<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import WearableItemIcon from '~/components/inventory/WearableItemIcon.vue'
import { allItems } from '~/data/items/items'
import { useDexFilterStore } from '~/stores/dexFilter'
import { useFeatureLockStore } from '~/stores/featureLock'
import { useShlagedexStore } from '~/stores/shlagedex'

interface Props {
  mons: DexShlagemon[]
  showCheckbox?: boolean
  disabledIds?: string[]
  highlightIds?: string[]
  onItemClick?: (mon: DexShlagemon) => void
}

const props = withDefaults(defineProps<Props>(), {
  showCheckbox: false,
  disabledIds: () => [],
  highlightIds: () => [],
})

const filter = useDexFilterStore()
const dex = useShlagedexStore()
const featureLock = useFeatureLockStore()
const isLocked = featureLock.isShlagedexLocked
const items = Object.fromEntries(allItems.map(i => [i.id, i])) as Record<string, typeof allItems[number]>

const sortOptions = [
  { label: 'Niveau', value: 'level' },
  { label: 'Rareté', value: 'rarity' },
  { label: 'Shiny', value: 'shiny' },
  { label: 'Objet équipé', value: 'item' },
  { label: 'Nom', value: 'name' },
  { label: 'Type', value: 'type' },
  { label: 'Attaque', value: 'attack' },
  { label: 'Défense', value: 'defense' },
  { label: 'Nb obtentions', value: 'count' },
  { label: 'Première capture', value: 'date' },
  { label: 'Proche d\'évoluer', value: 'evolution' },
] as const

const displayedMons = computed(() => {
  let mons = props.mons.slice()
  if (filter.search.trim()) {
    const q = filter.search.toLowerCase()
    mons = mons.filter(m => m.base.name.toLowerCase().includes(q))
  }
  switch (filter.sortBy) {
    case 'level':
      mons.sort((a, b) => a.lvl - b.lvl)
      break
    case 'rarity':
      mons.sort((a, b) => a.rarity - b.rarity)
      break
    case 'shiny':
      mons.sort((a, b) => Number(a.isShiny) - Number(b.isShiny))
      break
    case 'item':
      mons.sort((a, b) => Number(Boolean(a.heldItemId)) - Number(Boolean(b.heldItemId)))
      break
    case 'attack':
      mons.sort((a, b) => a.attack - b.attack)
      break
    case 'defense':
      mons.sort((a, b) => a.defense - b.defense)
      break
    case 'count':
      mons.sort((a, b) => a.captureCount - b.captureCount)
      break
    case 'date':
      mons.sort(
        (a, b) =>
          new Date(a.captureDate).getTime() - new Date(b.captureDate).getTime(),
      )
      break
    case 'name':
      mons.sort((a, b) => a.base.name.localeCompare(b.base.name))
      break
    case 'type':
      mons.sort(
        (a, b) =>
          (a.base.types[0]?.name || '').localeCompare(
            b.base.types[0]?.name || '',
          ),
      )
      break
    case 'evolution':
      mons.sort((a, b) => evolutionDistance(a) - evolutionDistance(b))
      break
  }
  if (!filter.sortAsc)
    mons.reverse()
  return mons
})

function evolutionDistance(mon: DexShlagemon): number {
  const evo = mon.base.evolution
  if (!evo)
    return Number.POSITIVE_INFINITY
  if (!mon.allowEvolution)
    return Number.POSITIVE_INFINITY
  if (evo.condition.type === 'item')
    return -2000
  if (evo.condition.type === 'lvl') {
    const diff = Math.abs(evo.condition.value - mon.lvl)
    if (mon.lvl >= evo.condition.value)
      return diff - 1000
    return diff
  }
  return Number.POSITIVE_INFINITY
}

function handleClick(mon: DexShlagemon) {
  if (props.disabledIds.includes(mon.id))
    return
  props.onItemClick?.(mon)
}

function isActive(mon: DexShlagemon) {
  return dex.activeShlagemon?.id === mon.id
}

function isHighlighted(mon: DexShlagemon) {
  return props.highlightIds.includes(mon.id)
}

function changeActive(mon: DexShlagemon) {
  if (isLocked.value)
    return
  dex.setActiveShlagemon(mon)
}
</script>

<template>
  <LayoutScrollablePanel>
    <template #header>
      <UiSortControls
        v-model:sort-by="filter.sortBy"
        v-model:sort-asc="filter.sortAsc"
        :options="sortOptions"
      />
      <UiSearchInput v-model="filter.search" />
    </template>

    <template #content>
      <div
        v-for="mon in displayedMons"
        :key="mon.id"
        class="relative flex cursor-pointer items-center justify-between border rounded p-1"
        hover="bg-gray-100 dark:bg-gray-800"
        :class="[
          isActive(mon)
            ? 'bg-blue-500/20 dark:bg-blue-500/20 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400'
            : '',
          isHighlighted(mon) && !isActive(mon)
            ? 'bg-blue-500/10 dark:bg-blue-500/20 ring-2 ring-blue-500 dark:ring-blue-400'
            : '',
          mon.rarity === 100
            ? 'border-yellow-500 dark:border-yellow-400'
            : '',
        ]"
        @click.stop="handleClick(mon)"
      >
        <div v-if="mon.heldItemId" class="absolute right-1 top-1 h-4 w-4">
          <WearableItemIcon
            :item="items[mon.heldItemId]"
            class="h-4 w-4"
          />
        </div>
        <div class="absolute bottom-0 right-2 text-xs">
          lvl {{ mon.lvl }}
        </div>
        <div class="flex items-center gap-2 overflow-hidden">
          <div class="h-12 w-12">
            <ShlagemonImage
              :id="mon.base.id"
              :alt="mon.base.name"
              :shiny="mon.isShiny"
            />
          </div>
          <div class="flex flex-col overflow-hidden">
            <div class="name">
              {{ mon.base.name }}
            </div>
            <div class="flex gap-1">
              <ShlagemonType
                v-for="t in mon.base.types"
                :key="t.id"
                :value="t"
                size="xs"
                open-on-click
              />
            </div>
          </div>
        </div>
        <UiCheckBox
          v-if="props.showCheckbox"
          class="ml-2"
          :model-value="isActive(mon)"
          :disabled="isLocked || props.disabledIds.includes(mon.id)"
          @update:model-value="() => changeActive(mon)"
          @click.stop
        />
      </div>
    </template>
  </LayoutScrollablePanel>
</template>
