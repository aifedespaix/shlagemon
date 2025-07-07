<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import ShlagemonImage from '~/components/shlagemon/ShlagemonImage.vue'
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import Button from '~/components/ui/Button.vue'
import CheckBox from '~/components/ui/CheckBox.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import SortControls from '~/components/ui/SortControls.vue'
import { allShlagemons } from '~/data/shlagemons'
import { useArenaStore } from '~/stores/arena'
import { useBattleStore } from '~/stores/battle'
import { useDexFilterStore } from '~/stores/dexFilter'
import { useShlagedexStore } from '~/stores/shlagedex'
import { applyStats, createDexShlagemon } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const filter = useDexFilterStore()
const battle = useBattleStore()
const arena = useArenaStore()

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

const selectedIds = ref<string[]>([])
const selectionDisabled = computed(() => selectedIds.value.length >= 6)

function toggleSelect(id: string) {
  const idx = selectedIds.value.indexOf(id)
  if (idx === -1) {
    if (selectedIds.value.length < 6)
      selectedIds.value.push(id)
  }
  else {
    selectedIds.value.splice(idx, 1)
  }
}

const enemyTeam = ref(allShlagemons.slice(0, 6))

onMounted(() => {
  enemyTeam.value = allShlagemons.slice().sort(() => Math.random() - 0.5).slice(0, 6)
})

function startBattle() {
  const team = selectedIds.value
    .map(id => dex.shlagemons.find(m => m.id === id)!)
    .map((mon) => {
      mon.hpCurrent = mon.hp
      return mon
    })
  const enemies = enemyTeam.value.map((b) => {
    const m = createDexShlagemon(b)
    applyStats(m)
    return m
  })
  arena.start(team, enemies)
  for (let i = 0; i < team.length; i++) {
    arena.currentIndex = i
    const player = team[i]
    const enemy = enemies[i]
    while (player.hpCurrent > 0 && enemy.hpCurrent > 0)
      battle.duel(player, enemy)
    if (player.hpCurrent <= 0) {
      arena.finish(false)
      // eslint-disable-next-line no-alert
      if (window.confirm('Défaite... Recommencer ?'))
        startBattle()
      return
    }
  }
  arena.finish(true)
  toast.success('Victoire !')
}
</script>

<template>
  <div class="h-full flex flex-col gap-2">
    <div class="mb-2 flex flex-wrap gap-2">
      <SortControls
        v-model:sort-by="filter.sortBy"
        v-model:sort-asc="filter.sortAsc"
        :options="sortOptions"
      />
      <SearchInput v-model="filter.search" class="flex-1" />
    </div>
    <div class="tiny-scrollbar flex flex-col gap-2 overflow-auto">
      <div
        v-for="mon in displayedMons"
        :key="mon.id"
        class="relative flex items-center justify-between border rounded p-2"
        hover="bg-gray-100 dark:bg-gray-800"
      >
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
          :model-value="selectedIds.includes(mon.id)"
          :disabled="selectionDisabled && !selectedIds.includes(mon.id)"
          @update:model-value="toggleSelect(mon.id)"
          @click.stop
        />
      </div>
    </div>
    <div class="mt-2 flex items-center justify-center gap-2" md="gap-3">
      <ShlagemonImage
        v-for="mon in enemyTeam"
        :id="mon.id"
        :key="mon.id"
        :alt="mon.name"
        class="h-8 w-8 object-contain" md="h-10 w-10"
      />
    </div>
    <Button
      type="primary"
      class="mx-auto mt-2"
      :disabled="selectedIds.length < 6"
      @click="startBattle"
    >
      Combattre
    </Button>
    <p class="text-center text-xs">
      Le combat est automatique et se déroule sans clics.
    </p>
  </div>
</template>
