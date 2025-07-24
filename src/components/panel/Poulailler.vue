<script setup lang="ts">
import type { EggType } from '~/stores/egg'
import type { EggItemId } from '~/stores/eggBox'
import { allItems } from '~/data/items/items'

const eggs = useEggStore()
const box = useEggBoxStore()
const modal = useEggHatchModalStore()
const panel = useMainPanelStore()
const { t } = useI18n()
const now = ref(Date.now())
function tick() {
  now.value = Date.now()
}
useIntervalFn(tick, 1000)

const colorMap: Record<EggType, string> = {
  feu: 'text-orange-500 dark:text-orange-400',
  eau: 'text-blue-500 dark:text-blue-400',
  plante: 'text-green-500 dark:text-green-400',
  electrique: 'text-yellow-500 dark:text-yellow-400',
  psy: 'text-pink-500 dark:text-pink-400',
}

function colorClass(type: EggType) {
  return colorMap[type] || ''
}

const inventoryEggs = computed(() => {
  return eggIds
    .map(id => ({
      id,
      item: allItems.find(i => i.id === id)!,
      qty: box.eggs[id as EggItemId] || 0,
    }))
    .filter(e => e.qty > 0)
})

function startIncubation(id: EggItemId) {
  if (eggs.incubator.length >= 4)
    return
  const map: Record<EggItemId, EggType> = {
    'oeuf-feu': 'feu',
    'oeuf-eau': 'eau',
    'oeuf-herbe': 'plante',
    'oeuf-psy': 'psy',
    'oeuf-foudre': 'electrique',
  }
  if (eggs.startIncubation(map[id]))
    box.removeEgg(id)
}

function hatch(id: number) {
  const mon = eggs.hatchEgg(id)
  if (mon)
    modal.open(mon)
}

function remaining(egg: { hatchesAt: number }) {
  return Math.max(0, Math.ceil((egg.hatchesAt - now.value) / 1000))
}
</script>

<template>
  <LayoutTitledPanel
    :title="t('components.panel.Poulailler.title')"
    :exit-text="t('components.panel.Poulailler.exit')"
    class="h-full"
    @exit="panel.showVillage()"
  >
    <div class="flex flex-1 flex-col gap-2 overflow-hidden" md="flex-row">
      <div class="flex flex-col gap-1" md="w-1/3">
        <h4 class="font-semibold">
          {{ t('components.panel.Poulailler.yourEggs') }}
        </h4>
        <div
          v-if="inventoryEggs.length"
          class="tiny-scrollbar flex flex-col gap-1 overflow-y-auto"
        >
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
              <span class="text-sm">{{ t(entry.item.nameKey || entry.item.name) }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-xs font-bold">x{{ entry.qty }}</span>
              <UiButton
                class="text-xs"
                :disabled="eggs.incubator.length >= 4"
                @click="startIncubation(entry.id as EggItemId)"
              >
                {{ t('components.panel.Poulailler.incubate') }}
              </UiButton>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-sm">
          {{ t('components.panel.Poulailler.noEggBox') }}
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-1" md="w-2/3">
        <h4 class="font-semibold">
          {{ t('components.panel.Poulailler.incubator') }}
        </h4>
        <div class="grid grid-cols-2 grid-rows-2 flex-1 place-items-center gap-2 border rounded p-2">
          <template v-if="eggs.incubator.length">
            <div
              v-for="egg in eggs.incubator"
              :key="egg.id"
              class="flex flex-col items-center gap-1"
            >
              <div
                class="i-game-icons:egg-eye transition-all duration-300"
                :class="[
                  eggs.isReady(egg)
                    ? 'h-12 w-12 animate-pulse-alt animate-count-infinite cursor-pointer'
                    : 'h-8 w-8 animate-bounce animate-count-infinite',
                  colorClass(egg.type),
                ]"
                @click="eggs.isReady(egg) && hatch(egg.id)"
              />
              <span v-if="!eggs.isReady(egg)" class="text-xs">{{ remaining(egg) }}s</span>
            </div>
          </template>
          <span v-else class="text-sm">{{ t('components.panel.Poulailler.noEgg') }}</span>
        </div>
      </div>
    </div>
    <EggHatchModal />
  </LayoutTitledPanel>
</template>
