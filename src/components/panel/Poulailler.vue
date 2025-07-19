<script setup lang="ts">
import type { EggItemId } from '~/stores/eggBox'
import { computed, ref } from 'vue'
import EggHatchModal from '~/components/egg/HatchModal.vue'
import { allItems } from '~/data/items/items'
import { useEggStore } from '~/stores/egg'
import { eggIds, useEggBoxStore } from '~/stores/eggBox'
import { useEggHatchModalStore } from '~/stores/eggHatchModal'
import { useMainPanelStore } from '~/stores/mainPanel'

const eggs = useEggStore()
const box = useEggBoxStore()
const modal = useEggHatchModalStore()
const panel = useMainPanelStore()
const now = ref(Date.now())
function tick() {
  now.value = Date.now()
}
useIntervalFn(tick, 1000)

const inventoryEggs = computed(() => {
  return eggIds
    .map(id => ({
      id,
      item: allItems.find(i => i.id === id)!,
      qty: box.eggs[id as EggItemId] || 0,
    }))
    .filter(e => e.qty > 0)
})

function startIncubation(id: string) {
  if (eggs.incubator)
    return
  const map = { 'oeuf-feu': 'feu', 'oeuf-eau': 'eau', 'oeuf-herbe': 'plante' } as const
  if (eggs.startIncubation(map[id]))
    box.removeEgg(id as EggItemId)
}

function hatch() {
  const mon = eggs.hatchEgg()
  if (mon)
    modal.open(mon)
}

function remaining(egg: { hatchesAt: number }) {
  return Math.max(0, Math.ceil((egg.hatchesAt - now.value) / 1000))
}
</script>

<template>
  <LayoutScrollablePanel>
    <template #header>
      <div class="w-full flex items-center justify-between">
        <h3 class="font-bold">
          Poulailler
        </h3>
        <UiButton
          type="danger"
          variant="outline"
          class="flex gap-1 text-xs"
          @click="panel.showVillage()"
        >
          <div class="i-carbon:exit" />
          Quitter
        </UiButton>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2">
        <div>
          <h4 class="font-semibold">
            Incubateur
          </h4>
          <div class="flex-center flex-col gap-1 border rounded p-2">
            <template v-if="eggs.incubator">
              <div
                class="i-game-icons:egg-eye transition-all duration-300"
                :class="[
                  eggs.isReady ? 'h-12 w-12 animate-pulse-alt animate-count-infinite cursor-pointer' : 'h-8 w-8',
                  {
                    'text-orange-500 dark:text-orange-400': eggs.incubator.type === 'feu',
                    'text-blue-500 dark:text-blue-400': eggs.incubator.type === 'eau',
                    'text-green-500 dark:text-green-400': eggs.incubator.type === 'plante',
                  },
                ]"
                @click="eggs.isReady && hatch()"
              />
              <span v-if="!eggs.isReady" class="text-xs">{{ remaining(eggs.incubator) }}s</span>
            </template>
            <span v-else class="text-sm">Aucun œuf</span>
          </div>
        </div>
        <div>
          <h4 class="font-semibold">
            Vos œufs
          </h4>
          <div v-if="inventoryEggs.length" class="flex flex-col gap-1">
            <div
              v-for="entry in inventoryEggs"
              :key="entry.id"
              class="flex items-center justify-between border-b p-1"
            >
              <div class="flex items-center gap-1">
                <div
                  v-if="entry.item.icon"
                  class="h-6 w-6"
                  :class="[entry.item.icon, entry.item.iconClass]"
                />
                <span class="text-sm">{{ entry.item.name }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-xs font-bold">x{{ entry.qty }}</span>
                <UiButton
                  v-if="!eggs.incubator"
                  class="text-xs"
                  @click="startIncubation(entry.id)"
                >
                  Incuber
                </UiButton>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-sm">
            Aucun œuf dans la boîte
          </div>
        </div>
      </div>
      <EggHatchModal />
    </template>
  </LayoutScrollablePanel>
</template>
