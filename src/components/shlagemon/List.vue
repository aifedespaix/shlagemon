<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { allItems, multiExp } from '~/data/items'

// Typage strict des props
interface Props {
  mons: readonly DexShlagemon[]
  showCheckbox?: boolean
  isMainShlagedex?: boolean
  disabledIds?: readonly string[]
  highlightIds?: readonly string[]
  locked?: boolean
  onItemClick?: (mon: DexShlagemon) => void
}
const props = withDefaults(defineProps<Props>(), {
  showCheckbox: false,
  isMainShlagedex: false,
  disabledIds: () => [],
  highlightIds: () => [],
  locked: undefined,
})

// Stores externes (Pinia)
const filter = useDexFilterStore()
const dex = useShlagedexStore()
const featureLock = useFeatureLockStore()
const equipment = useEquipmentStore()
const dexDetailModal = useDexDetailModalStore()
const isLocked = computed(() => props.locked ?? featureLock.isShlagedexLocked)
const items = Object.fromEntries(allItems.map(i => [i.id, i])) as Record<string, typeof allItems[number]>
const { t } = useI18n()
const newCount = computed(() => dex.newCount)
const panelRef = ref<{ scrollToTop: () => void } | null>(null)

/**
 * Shlagémon currently holding the Multi Exp, if any.
 */
const multiExpHolder = computed(() => {
  const holderId = equipment.getHolder(multiExp.id)
  return holderId ? dex.shlagemons.find(m => m.id === holderId) || null : null
})

/**
 * Open the detail modal for the Shlagémon holding the Multi Exp.
 */
function openMultiExpHolder() {
  if (multiExpHolder.value)
    dexDetailModal.open(multiExpHolder.value)
}

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

// Filter, sort and order Shlagemons efficiently.
// Selected mon comes first, followed by new or highlighted ones.
const displayedMons = computed(() => {
  const query = filter.search.trim().toLowerCase()
  const filtered: DexShlagemon[] = []
  for (const mon of props.mons) {
    if (query && !mon.base.name.toLowerCase().includes(query))
      continue
    filtered.push(mon)
  }
  switch (filter.sortBy) {
    case 'level':
      filtered.sort((a, b) => a.lvl - b.lvl)
      break
    case 'rarity':
      filtered.sort((a, b) => a.rarity - b.rarity)
      break
    case 'shiny':
      filtered.sort((a, b) => Number(a.isShiny) - Number(b.isShiny))
      break
    case 'item':
      filtered.sort((a, b) => Number(Boolean(a.heldItemId)) - Number(Boolean(b.heldItemId)))
      break
    case 'attack':
      filtered.sort((a, b) => a.attack - b.attack)
      break
    case 'defense':
      filtered.sort((a, b) => a.defense - b.defense)
      break
    case 'count':
      filtered.sort((a, b) => a.captureCount - b.captureCount)
      break
    case 'date':
      filtered.sort((a, b) => new Date(a.captureDate).getTime() - new Date(b.captureDate).getTime())
      break
    case 'name':
      filtered.sort((a, b) => a.base.name.localeCompare(b.base.name))
      break
    case 'type':
      filtered.sort((a, b) => (a.base.types[0]?.name || '').localeCompare(b.base.types[0]?.name || ''))
      break
    case 'evolution':
      filtered.sort((a, b) => evolutionDistance(a) - evolutionDistance(b))
      break
  }
  if (!filter.sortAsc)
    filtered.reverse()

  const activeId = dex.activeShlagemon?.id
  const highlightSet = new Set(props.highlightIds)

  const active: DexShlagemon[] = []
  const highlights: DexShlagemon[] = []
  const others: DexShlagemon[] = []

  for (const mon of filtered) {
    if (mon.id === activeId) {
      active.push(mon)
    }
    else if (highlightSet.has(mon.id) || mon.isNew) {
      highlights.push(mon)
    }
    else {
      others.push(mon)
    }
  }

  return [...active, ...highlights, ...others]
})

// Fonction de tri évolution
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

// Click handlers
function handleClick(mon: DexShlagemon) {
  if (props.disabledIds.includes(mon.id))
    return
  props.onItemClick?.(mon)
}
function isActive(mon: DexShlagemon) {
  return dex.activeShlagemon?.id === mon.id
}
function isHighlighted(mon: DexShlagemon) {
  return props.highlightIds.includes(mon.id) || Boolean(mon.isNew)
}
function changeActive(mon: DexShlagemon) {
  if (isLocked.value)
    return
  dex.setActiveShlagemon(mon)
}

watch(
  () => dex.activeShlagemon?.id,
  () => {
    nextTick(() => panelRef.value?.scrollToTop())
  },
)
</script>

<template>
  <LayoutScrollablePanel ref="panelRef">
    <template #header>
      <div class="sticky top-0 z-10 w-full flex flex-col gap-1 bg-white/70 backdrop-blur-lg dark:bg-gray-900/70">
        <div class="flex items-center gap-1">
          <UiSortControls
            v-model:sort-by="filter.sortBy"
            v-model:sort-asc="filter.sortAsc"
            :options="sortOptions"
          />
          <span class="ml-auto select-none text-xs font-mono opacity-70">
            {{ displayedMons.length }} / {{ props.mons.length }}
          </span>
        </div>
        <div v-if="isMainShlagedex && multiExpHolder" class="flex gap-1">
          <UiSearchInput v-model="filter.search" />
          <UiButton icon size="xs" variant="outline" @click="openMultiExpHolder">
            <span :class="multiExp.icon" />
          </UiButton>
        </div>
      </div>
    </template>

    <template #content>
      <TransitionGroup name="fade-list" tag="div" class="grid grid-cols-1 gap-1">
        <div v-if="newCount > 0" class="mb-1">
          <UiInfo
            color="info"
            class="col-span-2 row-start-3"
            ok-button
            @ok="dex.markAllSeen"
          >
            {{ t('components.shlagemon.List.new', newCount) }}
          </UiInfo>
        </div>
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
.fade-list-move,
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
.fade-list-leave-active {
  position: absolute;
}
</style>
