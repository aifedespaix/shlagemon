<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { allItems } from '~/data/items'

interface Props {
  /** Display a checkbox next to each item. */
  showCheckbox?: boolean
  /** Disable items whose ids are in this list. */
  disabledIds?: readonly string[]
  /** Highlight the given ids regardless of search results. */
  highlightIds?: readonly string[]
  /** Mark this id as active. */
  activeId?: string | null
  /** Force the list into a locked state. */
  locked?: boolean
  /** Callback triggered when an item is clicked. */
  onItemClick?: (mon: DexShlagemon) => void
  /** Callback triggered when an item is activated. */
  onItemActivate?: (mon: DexShlagemon) => void
}

const props = withDefaults(defineProps<Props>(), {
  showCheckbox: false,
  disabledIds: () => [],
  highlightIds: () => [],
  activeId: null,
  locked: undefined,
})

const { t } = useI18n()

const filter = useDexFilterStore()
const dex = useShlagedexStore()
const featureLock = useFeatureLockStore()

const isLocked = computed(() => props.locked ?? featureLock.isShlagedexLocked)

const items = Object.fromEntries(allItems.map(i => [i.id, i])) as Record<string, typeof allItems[number]>
const panelRef = ref<{ scrollToTop: () => void } | null>(null)

const sortOptions = [
  { label: t('components.shlagemon.ListGeneric.sort.level'), value: 'level' },
  { label: t('components.shlagemon.ListGeneric.sort.rarity'), value: 'rarity' },
  { label: t('components.shlagemon.ListGeneric.sort.shiny'), value: 'shiny' },
  { label: t('components.shlagemon.ListGeneric.sort.item'), value: 'item' },
  { label: t('components.shlagemon.ListGeneric.sort.name'), value: 'name' },
  { label: t('components.shlagemon.ListGeneric.sort.type'), value: 'type' },
  { label: t('components.shlagemon.ListGeneric.sort.attack'), value: 'attack' },
  { label: t('components.shlagemon.ListGeneric.sort.defense'), value: 'defense' },
  { label: t('components.shlagemon.ListGeneric.sort.count'), value: 'count' },
  { label: t('components.shlagemon.ListGeneric.sort.date'), value: 'date' },
  { label: t('components.shlagemon.ListGeneric.sort.evolution'), value: 'evolution' },
] as const

const displayedMons = computed(() => {
  const query = filter.search.trim().toLowerCase()
  const filtered: DexShlagemon[] = []
  for (const mon of dex.shlagemons) {
    if (query && !t(mon.base.name).toLowerCase().includes(query))
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
      filtered.sort((a, b) => t(a.base.name).localeCompare(t(b.base.name)))
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

  const activeId = props.activeId
  const highlightSet = new Set(props.highlightIds)

  const active: DexShlagemon[] = []
  const highlights: DexShlagemon[] = []
  const others: DexShlagemon[] = []

  for (const mon of filtered) {
    if (activeId && mon.id === activeId) {
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

function handleActivate(mon: DexShlagemon) {
  if (isLocked.value)
    return
  props.onItemActivate?.(mon)
}

function isActive(mon: DexShlagemon) {
  return props.activeId === mon.id
}

function isHighlighted(mon: DexShlagemon) {
  return props.highlightIds.includes(mon.id) || Boolean(mon.isNew)
}

watch(
  () => props.activeId,
  () => {
    nextTick(() => panelRef.value?.scrollToTop())
  },
)
</script>

<template>
  <LayoutScrollablePanel ref="panelRef">
    <template #header>
      <div class="sticky top-0 z-40 w-full flex flex-col gap-1 bg-white/70 backdrop-blur-lg dark:bg-gray-900/70">
        <div class="flex items-center gap-1">
          <UiSortControls
            v-model:sort-by="filter.sortBy"
            v-model:sort-asc="filter.sortAsc"
            :options="sortOptions"
          />
          <span class="ml-auto select-none text-xs font-mono opacity-70">
            {{ displayedMons.length }} / {{ dex.shlagemons.length }}
          </span>
        </div>
        <div class="flex gap-1">
          <UiSearchInput
            v-model="filter.search"
            :placeholder="t('components.shlagemon.ListGeneric.search')"
          />
          <slot name="header-extra" />
        </div>
      </div>
    </template>

    <template #content>
      <TransitionGroup name="fade-list" tag="div" class="grid grid-cols-1 gap-1">
        <slot name="content-top" />
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
          @activate="() => handleActivate(mon)"
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
