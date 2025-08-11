<script setup lang="ts">
import type { EggType } from '~/stores/egg'
import type { EggItemId } from '~/stores/eggBox'
import { eggTypeMap } from '~/constants/egg'
import { allItems } from '~/data/items'

/** === Stores ============================================================ */
const eggs = useEggStore()
const box = useEggBoxStore()
const eggMonsModal = useEggMonsModalStore()
const hatchModal = useEggHatchModalStore()
const panel = useMainPanelStore()
const { t } = useI18n()

/** === Const / Types ===================================================== */
const INCUBATOR_SLOTS = 4 as const
const eggIds = Object.keys(eggTypeMap) as unknown as readonly EggItemId[]

interface InventoryEntry {
  readonly id: EggItemId
  readonly qty: number
  readonly item: {
    readonly id: string
    readonly name: string
    readonly icon?: string
    readonly iconClass?: string
  }
}

const colorMap: Record<EggType, string> = {
  feu: 'text-orange-500 dark:text-orange-400',
  eau: 'text-blue-500 dark:text-blue-400',
  plante: 'text-green-500 dark:text-green-400',
  electrique: 'text-yellow-500 dark:text-yellow-400',
  psy: 'text-pink-500 dark:text-pink-400',
}

/** === Time tick (1s) ==================================================== */
const now = ref<number>(Date.now())
useIntervalFn(() => { now.value = Date.now() }, 1000)

/** === Computeds ========================================================= */
const inventoryEggs = computed<InventoryEntry[]>(() => {
  return eggIds
    .map((id) => ({
      id,
      item: allItems.find(i => i.id === id)!,
      qty: box.eggs[id] ?? 0,
    }))
    .filter(e => e.qty > 0)
})

const incubatorSlots = computed(() => {
  // always 4 slots; fill with null placeholders
  const filled = eggs.incubator.slice(0, INCUBATOR_SLOTS)
  return [...filled, ...Array(Math.max(0, INCUBATOR_SLOTS - filled.length)).fill(null)]
})

/** === Helpers =========================================================== */
function colorClass(type: EggType): string {
  return colorMap[type] ?? ''
}

function remaining(egg: { hatchesAt: number }): number {
  return Math.max(0, Math.ceil((egg.hatchesAt - now.value) / 1000))
}

function fmtSec(total: number): string {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

/** === Actions =========================================================== */
/** Démarre l’incubation si slot libre */
function startIncubation(id: EggItemId): void {
  if (eggs.incubator.length >= INCUBATOR_SLOTS) return
  if (eggs.startIncubation(eggTypeMap[id])) {
    box.removeEgg(id)
  }
}

function hatch(id: number): void {
  const mon = eggs.hatchEgg(id)
  if (mon) hatchModal.open(mon)
}

function showEggMons(id: EggItemId): void {
  const item = allItems.find(i => i.id === id)!
  eggMonsModal.open(id, item)
}

/** Accessibilité: aria-labels */
const incubateLabel = (name: string) =>
  t('components.panel.Poulailler.a11y.incubateEgg', { name }) as string

const eggReadyLabel = (type: EggType) =>
  t('components.panel.Poulailler.a11y.eggReady', { type }) as string
</script>

<template>
  <LayoutTitledPanel
    :title="t('components.panel.Poulailler.title')"
    :exit-text="t('components.panel.Poulailler.exit')"
    @exit="panel.showVillage()"
  >
    <div class="grid flex-1 gap-2 grid-cols-2 overflow-hidden">
      <section
        class="flex min-h-0 flex-col rounded-lg border bg-white/60 dark:bg-gray-900/40"
        aria-labelledby="eggs-inventory-title"
      >
        <header class="sticky top-0 z-1 rounded-t-lg bg-[inherit] p-2">
          <h4 id="eggs-inventory-title" class="text-base font-semibold">
            {{ t('components.panel.Poulailler.yourEggs') }}
          </h4>
        </header>

        <div
          v-if="inventoryEggs.length"
          class="tiny-scrollbar min-h-0 flex-1 overflow-y-auto pr-1"
          role="list"
          aria-label="Egg inventory list"
        >
          <article
            v-for="entry in inventoryEggs"
            :key="entry.id"
            role="listitem"
            class="group flex items-center justify-between gap-2 border-b p-2 last:border-b-0 hover:bg-gray/5 transition-colors"
          >
            <button
              type="button"
              class="min-w-0 flex flex-1 items-center gap-2 overflow-hidden text-left outline-none"
              :aria-label="t('components.panel.Poulailler.a11y.showSpecies', { name: t(entry.item.name) })"
              @click="showEggMons(entry.id)"
            >
              <div
                v-if="entry.item.icon"
                class="h-6 w-6 shrink-0"
                :class="[entry.item.icon, entry.item.iconClass]"
                aria-hidden="true"
              />
              <span class="truncate text-sm font-medium">
                {{ t(entry.item.name) }}
              </span>
            </button>

            <!-- Qté + CTA incubate -->
            <div class="flex items-center gap-2">
              <span class="shrink-0 text-xs font-semibold text-gray-700 dark:text-gray-200">
                ×{{ entry.qty }}
              </span>
              <UiButton
                size="xs"
                class="flex items-center gap-1 px-2 py-1 text-xs transition-all hover:translate-y--0.5"
                :disabled="eggs.incubator.length >= 4"
                :aria-label="incubateLabel(t(entry.item.name) as string)"
                @click="startIncubation(entry.id)"
              >
                <div class="i-carbon:chemistry text-base" aria-hidden="true" />
                <span class="hidden sm:inline">
                  {{ t('components.panel.Poulailler.incubate') }}
                </span>
              </UiButton>
            </div>
          </article>
        </div>

        <p v-else class="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          {{ t('components.panel.Poulailler.noEggBox') }}
        </p>
      </section>

      <!-- === Colonne droite : Grille 2x2 incubateur ============================= -->
      <section
        class="flex min-h-0 flex-col rounded-lg border bg-white/60 p-3 dark:bg-gray-900/40"
        aria-labelledby="incubator-title"
      >
        <header class="sticky top-0 z-1 -m-3 mb-2 rounded-t-lg bg-[inherit] p-3">
          <h4 id="incubator-title" class="text-base font-semibold">
            {{ t('components.panel.Poulailler.incubator') }}
          </h4>
        </header>

        <div
          class="grid grid-cols-2 grid-rows-2 flex-1 gap-3"
          role="grid"
          aria-rowcount="2"
          aria-colcount="2"
        >
          <!-- 4 slots (œufs ou placeholders) -->
          <div
            v-for="(slot, idx) in incubatorSlots"
            :key="slot?.id ?? `empty-${idx}`"
            role="gridcell"
            class="flex aspect-square items-center justify-center rounded-lg border bg-white/50 p-2 shadow-sm transition-all hover:shadow-md dark:bg-gray-950/40"
          >
            <!-- Slot rempli -->
            <template v-if="slot">
              <button
                type="button"
                class="group flex w-full flex-col items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-primary"
                :aria-label="eggs.isReady(slot) ? eggReadyLabel(slot.type) : t('components.panel.Poulailler.a11y.eggProgress')"
                :title="eggs.isReady(slot) ? (t('components.panel.Poulailler.tapToHatch') as string) : undefined"
                @click="eggs.isReady(slot) && hatch(slot.id)"
              >
                <div
                  class="i-game-icons:egg-eye transition-transform duration-300"
                  :class="[
                    eggs.isReady(slot)
                      ? 'h-14 w-14 animate-pulse-alt animate-count-infinite group-hover:scale-110 cursor-pointer'
                      : 'h-10 w-10 animate-bounce animate-count-infinite',
                    colorClass(slot.type),
                  ]"
                  aria-hidden="true"
                />
                <span
                  v-if="!eggs.isReady(slot)"
                  class="text-xs tabular-nums text-gray-700 dark:text-gray-200"
                  :aria-live="'polite'"
                >
                  {{ fmtSec(remaining(slot)) }}
                </span>
                <span
                  v-else
                  class="rounded px-2 py-0.5 text-xs font-semibold text-primary-600 dark:text-primary-400"
                >
                  {{ t('components.panel.Poulailler.ready') }}
                </span>
              </button>
            </template>

            <!-- Placeholder (slot vide) -->
            <template v-else>
              <div class="flex flex-col items-center gap-2 opacity-70">
                <div class="i-ph:egg-light h-10 w-10" aria-hidden="true" />
                <span class="text-[11px] text-gray-500 dark:text-gray-400">
                  {{ t('components.panel.Poulailler.emptySlot') }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </section>
    </div>

    <!-- Modals -->
    <EggHatchModal />
    <EggMonsModal />
  </LayoutTitledPanel>
</template>

<style scoped>
/* micro-ajustements focus visibles sur fond translucide */
:focus-visible {
  outline: none;
}
/* Optionnel: lisser les animations */
</style>
