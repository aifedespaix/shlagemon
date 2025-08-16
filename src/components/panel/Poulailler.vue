<script setup lang="ts">
import type { BreedingEntry } from '~/composables/useBreedingEggs'
import type { EggType } from '~/stores/egg'
import type { EggItemId } from '~/stores/eggBox'
import type { DialogNode } from '~/type/dialog'
import { eggColorClass, eggTypeMap } from '~/constants/egg'
import { magalieBredouille } from '~/data/characters/magalie-bredouille'
import { allItems } from '~/data/items'

/** === Stores ============================================================ */
const eggs = useEggStore()
const box = useEggBoxStore()
const eggMonsModal = useEggMonsModalStore()
const hatchModal = useEggHatchModalStore()
const panel = useMainPanelStore()
const { t } = useI18n()

function onExit() {
  panel.showVillage()
}

function createIntro(next: () => void): DialogNode[] {
  return [
    {
      id: 'intro',
      text: t('components.panel.Poulailler.intro'),
      responses: [
        { label: t('components.ui.Infos.ok'), type: 'primary', action: next },
      ],
    },
  ]
}

function createOutro(_result: string | undefined, exit: () => void): DialogNode[] {
  const key = eggs.incubator.length > 0 ? 'running' : 'idle'
  return [
    {
      id: 'outro',
      text: t(`components.panel.Poulailler.outro.${key}`),
      responses: [
        { label: t('components.ui.Infos.ok'), type: 'valid', action: exit },
      ],
    },
  ]
}

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

/** === Computeds ========================================================= */
const typeEggs = computed<InventoryEntry[]>(() => {
  return eggIds
    .map(id => ({
      id,
      item: allItems.find(i => i.id === id)!,
      qty: box.eggs[id] ?? 0,
    }))
    .filter(e => e.qty > 0)
})

const breedingEggs = useBreedingEggs()

const incubatorSlots = computed(() => {
  // always 4 slots; fill with null placeholders
  const filled = eggs.incubator.slice(0, INCUBATOR_SLOTS)
  return [...filled, ...Array.from({ length: Math.max(0, INCUBATOR_SLOTS - filled.length) }).fill(null)]
})

/** === Helpers =========================================================== */
function fmtSec(total: number): string {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

/** === Actions =========================================================== */
/** Démarre l’incubation si slot libre */
function startIncubation(id: EggItemId): void {
  if (eggs.incubator.length >= INCUBATOR_SLOTS)
    return
  if (eggs.startIncubation(eggTypeMap[id])) {
    box.removeEgg(id)
  }
}

function startBreedingIncubation(entry: BreedingEntry): void {
  if (eggs.incubator.length >= INCUBATOR_SLOTS)
    return
  if (eggs.startIncubation(entry.type, { isBreeding: true, forcedMonId: entry.monId, forcedRarity: entry.rarity }))
    box.removeBreedingEgg(entry.id)
}

function hatch(id: number): void {
  const mon = eggs.hatchEgg(id)
  if (mon)
    hatchModal.open(mon)
}

function showEggMons(id: EggItemId): void {
  const item = allItems.find(i => i.id === id)!
  eggMonsModal.open(id, item)
}

/** Accessibilité: aria-labels */
function incubateLabel(name: string) {
  return t('components.panel.Poulailler.a11y.incubateEgg', { name }) as string
}

function breedingLabel(entry: BreedingEntry) {
  return t('common.eggOf', { name: t(entry.mon.name) }) as string
}

function eggReadyLabel(type: EggType) {
  return t('components.panel.Poulailler.a11y.eggReady', { type }) as string
}
</script>

<template>
  <PanelPoiDialogFlow
    :title="t('components.panel.Poulailler.title')"
    :exit-text="t('components.panel.Poulailler.exit')"
    :character="magalieBredouille"
    :create-intro="createIntro"
    :create-outro="createOutro"
    :play-character-track="false"
    @exit="onExit"
  >
    <template #default>
      <div class="area w-full flex-1 overflow-hidden">
        <div class="area-grid h-full w-full gap-2 overflow-hidden">
          <!-- Colonne gauche : Inventaire -->
          <section
            class="min-h-0 flex flex-col border rounded-lg bg-white/60 dark:bg-gray-900/40"
            aria-labelledby="eggs-inventory-title"
          >
            <header class="sticky top-0 z-1 rounded-t-lg bg-[inherit] p-2">
              <h4 id="eggs-inventory-title" class="text-base font-semibold">
                {{ t('components.panel.Poulailler.yourEggs') }}
              </h4>
            </header>

            <div
              v-if="typeEggs.length || breedingEggs.length"
              class="tiny-scrollbar min-h-0 flex-1 overflow-y-auto pr-1"
              role="list"
              aria-label="Egg inventory list"
            >
              <!-- Œufs de reproduction -->
              <article
                v-for="entry in breedingEggs"
                :key="entry.id"
                role="listitem"
                class="group flex items-center justify-between gap-2 border-b p-2 transition-colors last:border-b-0 hover:bg-gray/5"
              >
                <div class="min-w-0 flex flex-1 items-center gap-2 overflow-hidden text-left">
                  <div class="i-game-icons:cosmic-egg h-6 w-6 shrink-0" :class="eggColorClass(entry.type)" aria-hidden="true" />
                  <span class="truncate text-sm font-medium" :class="eggColorClass(entry.type)">
                    {{ breedingLabel(entry) }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <UiButton
                    size="xs"
                    class="flex items-center gap-1 px-2 py-1 text-xs transition-all hover:translate-y--0.5"
                    :disabled="eggs.incubator.length >= 4"
                    :aria-label="incubateLabel(breedingLabel(entry))"
                    @click="startBreedingIncubation(entry)"
                  >
                    <div class="i-carbon:chemistry text-base" aria-hidden="true" />
                    <span class="hidden sm:inline">
                      {{ t('components.panel.Poulailler.incubate') }}
                    </span>
                  </UiButton>
                </div>
              </article>

              <!-- Œufs normaux -->
              <article
                v-for="entry in typeEggs"
                :key="entry.id"
                role="listitem"
                class="group flex items-center justify-between gap-2 border-b p-2 transition-colors last:border-b-0 hover:bg-gray/5"
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
                <div class="flex items-center gap-2">
                  <span class="shrink-0 text-xs text-gray-700 font-semibold dark:text-gray-200">
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

          <!-- Colonne droite : Incubateur -->
          <section
            class="min-h-0 flex flex-col border rounded-lg bg-white/60 p-3 dark:bg-gray-900/40"
            aria-labelledby="incubator-title"
          >
            <header class="sticky top-0 z-1 mb-2 rounded-t-lg bg-[inherit] p-3 -m-3">
              <h4 id="incubator-title" class="text-base font-semibold">
                {{ t('components.panel.Poulailler.incubator') }}
              </h4>
            </header>

            <div
              class="grid grid-cols-2 grid-rows-2 flex-1 gap-3 overflow-hidden"
              role="grid"
              aria-rowcount="2"
              aria-colcount="2"
            >
              <div
                v-for="(slot, idx) in incubatorSlots"
                :key="slot?.id ?? `empty-${idx}`"
                role="gridcell"
                class="flex items-center justify-center border rounded-lg bg-white/50 p-2 shadow-sm transition-all dark:bg-gray-950/40 hover:shadow-md"
              >
                <template v-if="slot">
                  <button
                    type="button"
                    class="group ring-primary w-full flex flex-col items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
                        eggColorClass(slot.type),
                      ]"
                      aria-hidden="true"
                    />
                    <span
                      v-if="!eggs.isReady(slot)"
                      class="text-xs text-gray-700 tabular-nums dark:text-gray-200"
                      aria-live="polite"
                    >
                      {{ fmtSec(eggs.remaining(slot)) }}
                    </span>
                    <span
                      v-else
                      class="text-primary-600 dark:text-primary-400 rounded px-2 py-0.5 text-xs font-semibold"
                    >
                      {{ t('components.panel.Poulailler.ready') }}
                    </span>
                  </button>
                </template>
                <template v-else>
                  <div class="flex flex-col items-center gap-2 opacity-70">
                    <div class="i-ph:egg-light h-10 w-10" aria-hidden="true" />
                    <span class="text-center text-[11px] text-gray-500 dark:text-gray-400">
                      {{ t('components.panel.Poulailler.emptySlot') }}
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Modals -->
      <EggHatchModal />
      <EggMonsModal />
    </template>
  </PanelPoiDialogFlow>
</template>

<style scoped>
/* micro-ajustements focus visibles sur fond translucide */
:focus-visible {
  outline: none;
}
.area {
  /* On observe largeur + hauteur du parent direct de la grille */
  container-type: size;
  container-name: area;
  min-height: 0; /* évite les overflow surprises dans des layouts flex */
}

/* Valeur par défaut (optionnelle) */
.area-grid {
  display: grid;
  gap: 0.5rem; /* = gap-2 */
}

/* Plus large que haut → 2 colonnes, 1 ligne */
@container area (aspect-ratio > 1) {
  .area-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 1fr;
  }
}

/* Plus haut que large → 1 colonne, 2 lignes */
@container area (aspect-ratio < 1) {
  .area-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
}
</style>
