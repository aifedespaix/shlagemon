<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import Modal from '~/components/modal/Modal.vue'
import SelectOption from '~/components/ui/SelectOption.vue'
import ShlagemonDetail from './ShlagemonDetail.vue'
import ShlagemonType from './ShlagemonType.vue'

const dex = useShlagedexStore()
const showDetail = ref(false)
const detailMon = ref<DexShlagemon | null>(dex.activeShlagemon)
const search = ref('')
const sortBy = ref<'level' | 'rarity' | 'name' | 'type'>('level')
const sortOptions = [
  { label: 'Niveau', value: 'level' },
  { label: 'Rareté', value: 'rarity' },
  { label: 'Nom', value: 'name' },
  { label: 'Type', value: 'type' },
]

const displayedMons = computed(() => {
  let mons = dex.shlagemons.slice()
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    mons = mons.filter(m => m.base.name.toLowerCase().includes(q))
  }
  switch (sortBy.value) {
    case 'level':
      mons.sort((a, b) => b.lvl - a.lvl)
      break
    case 'rarity':
      mons.sort((a, b) => b.rarity - a.rarity)
      break
    case 'name':
      mons.sort((a, b) => a.base.name.localeCompare(b.base.name))
      break
    case 'type':
      mons.sort((a, b) => (a.base.types[0]?.name || '').localeCompare(b.base.types[0]?.name || ''))
      break
  }
  return mons
})

function open(mon: DexShlagemon | null) {
  if (mon) {
    detailMon.value = mon
    showDetail.value = true
  }
}

function isActive(mon: DexShlagemon) {
  return dex.activeShlagemon?.id === mon.id
}
</script>

<template>
  <section v-if="dex.shlagemons.length" class="p-2">
    <div class="mb-2 flex flex-col gap-2" sm="flex-row">
      <SelectOption v-model="sortBy" class="sm:w-40" :options="sortOptions" />
      <input
        v-model="search"
        type="text"
        placeholder="Recherche"
        class="focus:border-primary w-full border border-gray-300 rounded bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
      >
    </div>
    <div class="flex flex-col gap-2">
      <div
        v-for="mon in displayedMons"
        :key="mon.id"
        class="relative flex cursor-pointer items-center justify-between border rounded p-2"
        hover="bg-gray-100 dark:bg-gray-800"
        :class="{ 'bg-primary/20': isActive(mon) }"
        :style="isActive(mon) ? { backgroundImage: `url(/shlagemons/${mon.base.id}/${mon.base.id}.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        @click.stop="open(mon)"
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
          <div class="flex flex-col">
            <div class="name">
              {{ mon.base.name }}
            </div>
            <div class="flex gap-1">
              <ShlagemonType
                v-for="t in mon.base.types"
                :key="t.id"
                :value="t"
                class="text-0.75rem"
              />
            </div>
          </div>
        </div>
        <CheckBox
          class="ml-2"
          :model-value="isActive(mon)"
          @update:model-value="() => dex.setActiveShlagemon(mon)"
          @click.stop
        />
      </div>
    </div>
    <Modal v-model="showDetail" footer-close @close="showDetail = false">
      <ShlagemonDetail :mon="detailMon" />
    </Modal>
  </section>
</template>
