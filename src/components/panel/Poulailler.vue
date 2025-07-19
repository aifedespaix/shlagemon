<script setup lang="ts">
import { computed, ref } from 'vue'
import EggHatchModal from '~/components/egg/HatchModal.vue'
import { allItems } from '~/data/items/items'
import { useEggStore } from '~/stores/egg'
import { useEggHatchModalStore } from '~/stores/eggHatchModal'
import { useInventoryStore } from '~/stores/inventory'

const eggs = useEggStore()
const inventory = useInventoryStore()
const modal = useEggHatchModalStore()
const now = ref(Date.now())
function tick() {
  now.value = Date.now()
}
setInterval(tick, 1000)

const inventoryEggs = computed(() => {
  return ['oeuf-feu', 'oeuf-eau', 'oeuf-herbe']
    .map(id => ({
      id,
      item: allItems.find(i => i.id === id)!,
      qty: inventory.items[id] || 0,
    }))
    .filter(e => e.qty > 0)
})

function startIncubation(id: string) {
  if (eggs.incubator)
    return
  const map = { 'oeuf-feu': 'feu', 'oeuf-eau': 'eau', 'oeuf-herbe': 'plante' } as const
  if (eggs.startIncubation(map[id]))
    inventory.remove(id as any)
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
      <h3 class="font-bold">
        Poulailler
      </h3>
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
                class="i-game-icons:egg-eye h-8 w-8"
                :class="{
                  'text-orange-500 dark:text-orange-400': eggs.incubator.type === 'feu',
                  'text-blue-500 dark:text-blue-400': eggs.incubator.type === 'eau',
                  'text-green-500 dark:text-green-400': eggs.incubator.type === 'plante',
                }"
              />
              <span v-if="!eggs.isReady" class="text-xs">{{ remaining(eggs.incubator) }}s</span>
              <UiButton v-else class="text-xs" @click="hatch">
                Éclore
              </UiButton>
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
            Aucun œuf dans l'inventaire
          </div>
        </div>
      </div>
      <EggHatchModal />
    </template>
  </LayoutScrollablePanel>
</template>
