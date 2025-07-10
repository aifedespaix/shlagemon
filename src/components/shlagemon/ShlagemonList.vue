<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'
import MultiExpIcon from '~/components/icons/multi-exp.vue'
import CheckBox from '~/components/ui/CheckBox.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import SortControls from '~/components/ui/SortControls.vue'
import { useDexFilterStore } from '~/stores/dexFilter'
import { useDiseaseStore } from '~/stores/disease'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMobileTabStore } from '~/stores/mobileTab'
import { useMultiExpStore } from '~/stores/multiExp'
import { useShlagedexStore } from '~/stores/shlagedex'
import ShlagemonImage from './ShlagemonImage.vue'
import ShlagemonType from './ShlagemonType.vue'

interface Props {
  mons: DexShlagemon[]
  showCheckbox?: boolean
  disabledIds?: string[]
  onItemClick?: (mon: DexShlagemon) => void
}

const props = withDefaults(defineProps<Props>(), {
  showCheckbox: false,
  disabledIds: () => [],
})

const filter = useDexFilterStore()
const dex = useShlagedexStore()
const multiExpStore = useMultiExpStore()
const disease = useDiseaseStore()
const panel = useMainPanelStore()
const mobile = useMobileTabStore()
const isMobile = useMediaQuery('(max-width: 767px)')

const isLocked = computed(() => panel.current === 'trainerBattle' || disease.active)

const sortOptions = [
  { label: 'Niveau', value: 'level' },
  { label: 'Rareté', value: 'rarity' },
  { label: 'Shiny', value: 'shiny' },
  { label: 'Nom', value: 'name' },
  { label: 'Type', value: 'type' },
  { label: 'Attaque', value: 'attack' },
  { label: 'Défense', value: 'defense' },
  { label: 'Nb obtentions', value: 'count' },
  { label: 'Première capture', value: 'date' },
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
  }
  if (!filter.sortAsc)
    mons.reverse()
  return mons
})

function handleClick(mon: DexShlagemon) {
  if (props.disabledIds.includes(mon.id))
    return
  props.onItemClick?.(mon)
}

function isActive(mon: DexShlagemon) {
  return dex.activeShlagemon?.id === mon.id
}

function changeActive(mon: DexShlagemon) {
  if (isLocked.value)
    return
  dex.setActiveShlagemon(mon)
  if (isMobile.value)
    mobile.set('game')
}
</script>

<template>
  <ScrollablePanel>
    <template #header>
      <SortControls
        v-model:sort-by="filter.sortBy"
        v-model:sort-asc="filter.sortAsc"
        :options="sortOptions"
      />
      <SearchInput v-model="filter.search" />
    </template>

    <template #content>
      <div
        v-for="mon in displayedMons"
        :key="mon.id"
        class="relative flex cursor-pointer items-center justify-between border rounded p-1"
        hover="bg-gray-100 dark:bg-gray-800"
        :class="isActive(mon) ? 'bg-blue-500/20 dark:bg-blue-500/20 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400' : ''"
        @click.stop="handleClick(mon)"
      >
        <MultiExpIcon v-if="multiExpStore.holderId === mon.id" class="absolute right-1 top-1 h-4 w-4" />
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
              />
            </div>
          </div>
        </div>
        <CheckBox
          v-if="props.showCheckbox"
          class="ml-2"
          :model-value="isActive(mon)"
          :disabled="isLocked || props.disabledIds.includes(mon.id)"
          @update:model-value="() => changeActive(mon)"
          @click.stop
        />
      </div>
    </template>
  </ScrollablePanel>
</template>
