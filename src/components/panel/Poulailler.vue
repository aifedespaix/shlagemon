<script setup lang="ts">
import type { EggType } from '~/stores/egg'
import type { EggItemId } from '~/stores/eggBox'
import { eggTypeMap } from '~/constants/egg'
import { allItems } from '~/data/items/items'

const eggMonsModal = useEggMonsModalStore()

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
  if (eggs.startIncubation(eggTypeMap[id]))
    box.removeEgg(id)
}

function hatch(id: number) {
  const mon = eggs.hatchEgg(id)
  if (mon)
    modal.open(mon)
}

function showEggMons(id: EggItemId) {
  const item = allItems.find(i => i.id === id)!
  eggMonsModal.open(id, item)
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
    <div class="flex flex-1 gap-2 overflow-hidden">
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
            class="flex items-center justify-between gap-2 border-b p-2"
            @click="showEggMons(entry.id as EggItemId)"
          >
            <!-- Icône + Nom -->
            <div class="min-w-0 flex flex-1 items-center gap-2 overflow-hidden">
              <div
                v-if="entry.item.icon"
                class="h-6 w-6 shrink-0"
                :class="[entry.item.icon, entry.item.iconClass]"
              />
              <span class="truncate text-sm font-medium">
                {{ t(entry.item.nameKey || entry.item.name) }}
              </span>
            </div>

            <!-- Quantité + Bouton -->
            <div class="max-w-[120px] flex flex-nowrap items-center justify-end gap-2 overflow-hidden">
              <span class="shrink-0 text-xs text-gray-700 font-semibold">
                x{{ entry.qty }}
              </span>
              <UiButton
                class="flex shrink-0 items-center gap-1 px-2 py-1 text-xs"
                :disabled="eggs.incubator.length >= 4"
                @click.stop="startIncubation(entry.id as EggItemId)"
              >
                <div class="i-carbon:chemistry text-base" />
                <span class="hidden truncate sm:inline">
                  {{ t('components.panel.Poulailler.incubate') }}
                </span>
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
    <EggMonsModal />
  </LayoutTitledPanel>
</template>
