<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { allItems } from '~/data/items'

// Typage strict des props
interface Props {
  mons: readonly DexShlagemon[]
  showCheckbox?: boolean
  disabledIds?: readonly string[]
  highlightIds?: readonly string[]
  onItemClick?: (mon: DexShlagemon) => void
}
const props = withDefaults(defineProps<Props>(), {
  showCheckbox: false,
  disabledIds: () => [],
  highlightIds: () => [],
})

// Stores externes (Pinia)
const filter = useDexFilterStore()
const dex = useShlagedexStore()
const featureLock = useFeatureLockStore()
const isLocked = toRef(featureLock, 'isShlagedexLocked')
const items = Object.fromEntries(allItems.map(i => [i.id, i])) as Record<string, typeof allItems[number]>

// Options de tri
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

// Tri et recherche filtrée
const displayedMons = computed(() => {
  let mons = [...props.mons]
  if (filter.search.trim()) {
    const q = filter.search.toLowerCase()
    mons = mons.filter(m => m.base.name.toLowerCase().includes(q))
  }
  switch (filter.sortBy) {
    case 'level': mons.sort((a, b) => a.lvl - b.lvl); break
    case 'rarity': mons.sort((a, b) => a.rarity - b.rarity); break
    case 'shiny': mons.sort((a, b) => Number(a.isShiny) - Number(b.isShiny)); break
    case 'item': mons.sort((a, b) => Number(Boolean(a.heldItemId)) - Number(Boolean(b.heldItemId))); break
    case 'attack': mons.sort((a, b) => a.attack - b.attack); break
    case 'defense': mons.sort((a, b) => a.defense - b.defense); break
    case 'count': mons.sort((a, b) => a.captureCount - b.captureCount); break
    case 'date': mons.sort((a, b) => new Date(a.captureDate).getTime() - new Date(b.captureDate).getTime()); break
    case 'name': mons.sort((a, b) => a.base.name.localeCompare(b.base.name)); break
    case 'type': mons.sort((a, b) => (a.base.types[0]?.name || '').localeCompare(b.base.types[0]?.name || '')); break
    case 'evolution': mons.sort((a, b) => evolutionDistance(a) - evolutionDistance(b)); break
  }
  if (!filter.sortAsc) mons.reverse()
  return mons
})

// Fonction de tri évolution
function evolutionDistance(mon: DexShlagemon): number {
  const evo = mon.base.evolution
  if (!evo) return Number.POSITIVE_INFINITY
  if (!mon.allowEvolution) return Number.POSITIVE_INFINITY
  if (evo.condition.type === 'item') return -2000
  if (evo.condition.type === 'lvl') {
    const diff = Math.abs(evo.condition.value - mon.lvl)
    if (mon.lvl >= evo.condition.value) return diff - 1000
    return diff
  }
  return Number.POSITIVE_INFINITY
}

// Click handlers
function handleClick(mon: DexShlagemon) {
  if (props.disabledIds.includes(mon.id)) return
  props.onItemClick?.(mon)
}
function isActive(mon: DexShlagemon) {
  return dex.activeShlagemon?.id === mon.id
}
function isHighlighted(mon: DexShlagemon) {
  return props.highlightIds.includes(mon.id)
}
function changeActive(mon: DexShlagemon) {
  if (isLocked.value) return
  dex.setActiveShlagemon(mon)
}
</script>

<template>
  <LayoutScrollablePanel>
    <template #header>
      <div class="w-full flex flex-col gap-1 bg-white/70 dark:bg-gray-900/70 sticky top-0 z-10 backdrop-blur-lg">
        <div class="flex items-center gap-2">
          <UiSortControls
            v-model:sort-by="filter.sortBy"
            v-model:sort-asc="filter.sortAsc"
            :options="sortOptions"
          />
          <span class="text-xs opacity-70 ml-auto font-mono select-none">
            {{ displayedMons.length }} / {{ props.mons.length }}
          </span>
        </div>
        <UiSearchInput v-model="filter.search" />
      </div>
    </template>

    <template #content>
        <TransitionGroup name="fade-list" tag="div" class="grid gap-1 grid-cols-1 p-1">
          <ShlagemonListItem
            v-for="mon in displayedMons"
            :key="mon.id"
            :mon="mon"
            :is-active="isActive(mon)"
            :is-highlighted="isHighlighted(mon)"
            :disabled="props.disabledIds.includes(mon.id)"
            :locked="isLocked"
            :item="mon.heldItemId ? items[mon.heldItemId] : null"
            :show-checkbox="props.showCheckbox"
            @click="() => handleClick(mon)"
            @activate="() => changeActive(mon)"
          />
        </TransitionGroup>
    </template>
  </LayoutScrollablePanel>
</template>

<style scoped>
.fade-list-move, .fade-list-enter-active, .fade-list-leave-active {
  transition: all 0.25s cubic-bezier(.4,0,.2,1);
}
.fade-list-enter-from, .fade-list-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(.98);
}
.fade-list-leave-active {
  position: absolute;
}
</style>
