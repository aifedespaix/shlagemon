<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { computed, ref, watch } from 'vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import SortControls from '~/components/ui/SortControls.vue'
import { useShlagedexStore } from '~/stores/shlagedex'
import ShlagemonImage from './ShlagemonImage.vue'
import ShlagemonType from './ShlagemonType.vue'

interface Props {
  selected?: string[]
}

const props = withDefaults(defineProps<Props>(), { selected: () => [] })

const emit = defineEmits<{ (e: 'select', mon: DexShlagemon): void }>()
const dex = useShlagedexStore()

const search = ref('')
const sortBy = ref<'level' | 'rarity' | 'name' | 'type' | 'shiny' | 'attack' | 'defense' | 'count' | 'date'>('level')
const sortAsc = ref(false)

watch(sortBy, (val) => {
  if (val === 'name' || val === 'type' || val === 'date')
    sortAsc.value = true
  else
    sortAsc.value = false
})

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
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    mons = mons.filter(m => m.base.name.toLowerCase().includes(q))
  }
  switch (sortBy.value) {
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
  if (!sortAsc.value)
    mons.reverse()
  return mons
})

function choose(mon: DexShlagemon) {
  dex.setActiveShlagemon(mon)
  emit('select', mon)
}

function isSelected(mon: DexShlagemon) {
  return props.selected.includes(mon.id)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <SortControls v-model:sort-by="sortBy" v-model:sort-asc="sortAsc" :options="sortOptions" />
      <SearchInput v-model="search" />
    </div>
    <div class="tiny-scrollbar max-h-60 flex flex-col gap-2 overflow-auto">
      <button
        v-for="mon in displayedMons"
        :key="mon.id"
        class="flex items-center justify-between gap-2 border rounded p-2 text-left"
        :class="isSelected(mon) ? 'opacity-50' : ''"
        @click="choose(mon)"
      >
        <span class="w-6 text-xs font-bold">lvl {{ mon.lvl }}</span>
        <ShlagemonImage
          :id="mon.base.id"
          :alt="mon.base.name"
          :shiny="mon.isShiny"
          class="h-8 w-8 object-contain"
        />
        <div class="flex gap-1">
          <ShlagemonType v-for="t in mon.base.types" :key="t.id" :value="t" />
        </div>
        <span class="flex-1 truncate text-xs">{{ mon.base.name }}</span>
      </button>
    </div>
  </div>
</template>
