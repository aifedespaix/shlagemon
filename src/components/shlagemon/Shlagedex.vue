<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { useMediaQuery } from '@vueuse/core'
import MultiExpIcon from '~/components/icons/multi-exp.vue'
import Modal from '~/components/modal/Modal.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import SelectOption from '~/components/ui/SelectOption.vue'
import { useDexFilterStore } from '~/stores/dexFilter'
import { useDiseaseStore } from '~/stores/disease'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMobileTabStore } from '~/stores/mobileTab'
import { useMultiExpStore } from '~/stores/multiExp'
import ShlagemonDetail from './ShlagemonDetail.vue'
import ShlagemonType from './ShlagemonType.vue'

const dex = useShlagedexStore()
const panel = useMainPanelStore()
const disease = useDiseaseStore()
const filter = useDexFilterStore()
const showDetail = ref(false)
const detailMon = ref<DexShlagemon | null>(dex.activeShlagemon)
const isLocked = computed(() => panel.current === 'trainerBattle' || disease.active)
const multiExpStore = useMultiExpStore()
const mobile = useMobileTabStore()
const isMobile = useMediaQuery('(max-width: 767px)')
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
]

const displayedMons = computed(() => {
  let mons = dex.shlagemons.slice()
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
      mons.sort((a, b) => new Date(a.captureDate).getTime() - new Date(b.captureDate).getTime())
      break
    case 'name':
      mons.sort((a, b) => a.base.name.localeCompare(b.base.name))
      break
    case 'type':
      mons.sort((a, b) => (a.base.types[0]?.name || '').localeCompare(b.base.types[0]?.name || ''))
      break
  }
  if (!filter.sortAsc)
    mons.reverse()
  return mons
})

const clickTimer = ref<number | null>(null)

function open(mon: DexShlagemon | null) {
  if (mon) {
    detailMon.value = mon
    showDetail.value = true
  }
}

function onClick(mon: DexShlagemon) {
  clearTimeout(clickTimer.value as any)
  clickTimer.value = window.setTimeout(() => open(mon), 300)
}

function onDoubleClick(mon: DexShlagemon) {
  clearTimeout(clickTimer.value as any)
  changeActive(mon)
}

function changeActive(mon: DexShlagemon) {
  if (isLocked.value)
    return
  dex.setActiveShlagemon(mon)
  if (isMobile.value)
    mobile.set('game')
}

function isActive(mon: DexShlagemon) {
  return dex.activeShlagemon?.id === mon.id
}
</script>

<template>
  <section v-if="dex.shlagemons.length" class="h-full flex flex-col">
    <div class="mb-2 flex flex-wrap gap-2">
      <div class="min-w-36 flex flex-1 items-center">
        <SelectOption
          v-model="filter.sortBy"
          class="min-w-24 flex-1"
          :options="sortOptions"
        />
        <button
          class="ml-1 text-lg icon-btn"
          :aria-label="filter.sortAsc ? 'Tri ascendant' : 'Tri descendant'"
          @click="filter.sortAsc = !filter.sortAsc"
        >
          <div :class="filter.sortAsc ? 'i-carbon-sort-ascending' : 'i-carbon-sort-descending'" />
        </button>
      </div>
      <SearchInput v-model="filter.search" />
    </div>
    <div class="flex flex-col gap-2 overflow-auto">
      <div
        v-for="mon in displayedMons"
        :key="mon.id"
        class="relative flex cursor-pointer items-center justify-between border rounded p-2"
        hover="bg-gray-100 dark:bg-gray-800"
        :class="isActive(mon) ? 'bg-blue-500/20 dark:bg-blue-500/20 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400' : ''"
        @click.stop="onClick(mon)"
        @dblclick.stop="onDoubleClick(mon)"
      >
        <MultiExpIcon v-if="multiExpStore.holderId === mon.id" class="absolute left-1 top-1 h-4 w-4" />
        <div class="absolute bottom-0 right-2 text-xs">
          lvl {{ mon.lvl }}
        </div>
        <div class="flex items-center gap-2">
          <ShlagemonImage
            :id="mon.base.id"
            :alt="mon.base.name"
            :shiny="mon.isShiny"
            class="h-12 w-12 object-contain -m-y-2"
          />
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
          class="ml-2"
          :model-value="isActive(mon)"
          :disabled="isLocked"
          @update:model-value="() => changeActive(mon)"
          @click.stop
        />
      </div>
    </div>
    <Modal v-model="showDetail" footer-close @close="showDetail = false">
      <ShlagemonDetail :mon="detailMon" @release="showDetail = false" />
    </Modal>
  </section>
</template>
