<script setup lang="ts">
import type { DojoTrainingJob } from '~/stores/dojo'
import type { DialogNode } from '~/type/dialog'
import type { DexShlagemon } from '~/type/shlagemon'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { glandhi } from '~/data/characters/glandhi'
import { toast } from '~/modules/toast'
import { dojoTrainingCost, useDojoStore } from '~/stores/dojo'

/** === Stores / i18n ===================================================== */
const panel = useMainPanelStore()
const dojo = useDojoStore()
const game = useGameStore()
const dex = useShlagedexStore()
const { t } = useI18n()

function onExit() {
  panel.showVillage()
}

function createIntro(next: () => void): DialogNode[] {
  return [
    {
      id: 'intro',
      text: t('components.panel.Dojo.intro'),
      responses: [
        { label: t('ui.Info.ok'), type: 'primary', action: next },
      ],
    },
  ]
}

/** === State ============================================================= */
const selected = ref<DexShlagemon | null>(null)
const selectorOpen = ref(false)
const points = ref<number>(1)
const now = ref<number>(Date.now())

/** Tick 1s pour refresh remaining/progress (pause au unmount) */
const { pause: pauseTick } = useIntervalFn(
  () => {
    now.value = Date.now()
  },
  1000,
)
onBeforeUnmount(pauseTick)

/** === Utils ============================================================= */
const clamp = (val: number, min: number, max: number): number => Math.min(max, Math.max(min, val))
const safeMax = computed<number>(() => (selected.value ? Math.max(1, 100 - selected.value.rarity) : 1))

/** === Derived =========================================================== */
const job = computed(() => (selected.value ? dojo.getJob(selected.value.id) : null))
const isRunning = computed<boolean>(() => !!job.value) // ⟵ NEW

function createOutro(_: string | undefined, exit: () => void): DialogNode[] {
  const key = isRunning.value ? 'running' : 'idle'
  return [
    {
      id: 'outro',
      text: t(`components.panel.Dojo.outro.${key}`),
      responses: [
        { label: t('ui.Info.ok'), type: 'valid', action: exit },
      ],
    },
  ]
}

/** Empêche d'ouvrir le sélecteur pendant un entraînement */
function openSelector() {
  if (isRunning.value)
    return
  selectorOpen.value = true
}

/** Recalibre les points à chaque changement de mon */
watch(selected, () => {
  points.value = 1
})

/** Coût, durée (en minutes), progress & remaining (en s) */
const cost = computed<number>(() => (selected.value ? dojoTrainingCost(selected.value.rarity, clamp(points.value, 1, safeMax.value)) : 0))
const durationMin = computed<number>(() => clamp(points.value, 1, safeMax.value))

const remaining = computed<number>(() => {
  void now.value
  return job.value ? Math.max(0, Math.ceil(dojo.remainingMs(job.value.monId) / 1000)) : 0
})
const progress = computed<number>(() => {
  void now.value
  return job.value ? Math.min(100, Math.max(0, dojo.progressRatio(job.value.monId) * 100)) : 0
})

/** Formatage court (mm:ss) pour remaining */
const remainingLabel = computed<string>(() => {
  const s = remaining.value
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
})

/** Auto-complete si terminé */
watch(now, () => {
  const mon = selected.value
  if (!mon)
    return
  if (dojo.completeIfDue(mon.id)) {
    toast.success(t('components.panel.Dojo.toast.finished'))
  }
})

/** Auto-select l'entraînement en cours à l'entrée dans le dojo */
onMounted(() => {
  if (selected.value)
    return
  const job = Object.values(dojo.byMonId).find(Boolean) as DojoTrainingJob | undefined
  if (job) {
    const mon = dex.shlagemons.find(m => m.id === job.monId) ?? null
    selected.value = mon
  }
})

function selectMon(mon: DexShlagemon) {
  selected.value = mon
  selectorOpen.value = false
}

function setPointsFromSlider(val: number) {
  points.value = clamp(Math.round(val), 1, safeMax.value)
}
function setPointsFromNumber(val: number | string) {
  const n = typeof val === 'string' ? Number(val) : val
  points.value = clamp(Number.isFinite(n) ? Math.trunc(n) : 1, 1, safeMax.value)
}

/** Raccourcis +/- via clavier pour affiner rapidement */

function start() {
  if (!selected.value)
    return
  const res = dojo.startTraining(selected.value.id, selected.value.rarity, points.value)
  if (res.ok)
    toast.success(t('components.panel.Dojo.toast.started'))
}

/** === A11y IDs ========================================================== */
const ids = {
  title: 'dojo-title',
  slider: 'dojo-points-slider',
  number: 'dojo-points-number',
  cost: 'dojo-cost',
  duration: 'dojo-duration',
  progress: 'dojo-progress',
} as const
</script>

<template>
  <PanelPoiDialogFlow
    :title="t('components.panel.Dojo.title')"
    :exit-text="t('components.panel.Dojo.exit')"
    :character="glandhi"
    :create-intro="createIntro"
    :create-outro="createOutro"
    :play-character-track="false"
    @exit="onExit"
  >
    <template #default>
      <!-- Conteneur qui respecte la hauteur du parent (no vh/vw) -->
      <div class="min-h-0 w-full flex-1">
        <div class="h-full flex flex-1 items-center justify-center overflow-y-auto px-2 py-3 sm:px-3">
          <!-- CTA sélection -->
          <UiButton v-if="!selected" type="primary" class="aspect-square w-24" @click="openSelector">
            {{ t('components.panel.Dojo.selectMon') }}
          </UiButton>
          <UiAdaptiveDisplayer v-else class="area-grid h-full w-full gap-3 md:gap-4">
            <!-- Contenu principal -->
            <div
              class="min-h-0 min-w-0 flex-1 cursor-pointer overflow-hidden rounded-xl bg-gray-50 p-3 dark:bg-gray-800"
              @click="openSelector"
            >
              <div
                class="relative h-full w-full flex items-center justify-center"
              >
                <ShlagemonImage
                  :id="selected.base.id"
                  :alt="t(selected.base.name)"
                  class="h-full w-full object-contain transition-transform duration-300 will-change-transform"
                />
                <!-- Badges d’info -->
                <div class="pointer-events-none absolute left-2 top-2 flex gap-2">
                  <span
                    class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 font-medium dark:bg-emerald-900/50 dark:text-emerald-200"
                    aria-label="Rareté actuelle"
                  >
                    {{ t('components.panel.Dojo.rarity.current') }}: {{ selected.rarity }}
                  </span>
                  <span
                    class="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900 font-medium dark:bg-amber-900/50 dark:text-amber-100"
                    aria-label="Rareté après entraînement"
                  >
                    {{ t('components.panel.Dojo.rarity.after') }}: {{ Math.min(100, selected.rarity + points) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="min-w-0 flex flex-1 flex-col justify-center gap-3">
              <div v-if="!isRunning" class="w-full flex flex-col gap-4 border border-gray-200 rounded-xl p-3 dark:border-gray-700">
                <div class="flex flex-col items-center justify-between">
                  <label :for="ids.slider" class="text-sm font-medium">
                    {{ t('components.panel.Dojo.rarity.points') }}
                  </label>
                  <div class="relative w-full flex flex-col items-center gap-2">
                    <input
                      :id="ids.slider"
                      v-model="points"
                      type="range"
                      min="1"
                      :max="safeMax"
                      class="dojo-slider w-full"
                      @input="setPointsFromSlider(($event.target as HTMLInputElement).valueAsNumber)"
                    >
                    <UiNumberInput
                      :id="ids.number"
                      v-model="points"
                      min="1"
                      :max="safeMax"
                      class="w-20"
                      @input="setPointsFromNumber"
                    />
                  </div>
                  <div v-if="safeMax === 1" class="text-xs text-amber-500">
                    {{ t('components.panel.Dojo.rarity.limitReached') }}
                  </div>
                </div>

                <div class="flex flex-col items-center gap-1 text-sm" :aria-labelledby="ids.cost">
                  <span v-if="cost > game.shlagidolar" class="text-red-500">
                    {{ t('components.panel.Dojo.cost.insufficient') }}
                  </span>
                </div>

                <div class="flex flex-col items-center gap-1 text-sm" :aria-labelledby="ids.duration">
                  <span :id="ids.duration" class="font-medium">
                    {{ t('components.panel.Dojo.duration.label') }}
                  </span>
                  <span>
                    {{ durationMin }}
                    <span v-if="durationMin === 1">
                      {{ t('components.panel.Dojo.duration.minute') }}
                    </span>
                    <span v-else>
                      {{ t('components.panel.Dojo.duration.minutes') }}
                    </span>
                  </span>
                </div>
              </div>

              <!-- Progression -->
              <div v-if="job" class="w-full flex flex-col gap-2 border border-gray-200 rounded-xl p-3 dark:border-gray-700">
                <div v-if="isRunning" class="w-full flex flex-col items-center rounded-lg bg-amber-50 px-3 py-2 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
                  <div> {{ t('components.panel.Dojo.status.running') }}</div>
                  <div> <span class="tabular-nums">{{ remainingLabel }}</span></div>
                </div>
                <div
                  :id="ids.progress"
                  class="h-2 w-full rounded bg-gray-300 dark:bg-gray-700"
                  role="progressbar"
                  :aria-label="t('components.panel.Dojo.progress')"
                  :aria-valuemin="0"
                  :aria-valuemax="100"
                  :aria-valuenow="Math.round(progress)"
                >
                  <div
                    class="will-change-[width] h-full rounded bg-green-500 transition-[width] duration-300"
                    :style="{ width: `${progress}%` }"
                  />
                </div>

                <div class="mt-2 flex items-center justify-between text-sm">
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ t('components.panel.Dojo.duration.remaining') }}:
                    <span class="tabular-nums">{{ remainingLabel }}</span>
                  </p>
                  <p class="text-gray-500 dark:text-gray-400">
                    {{ Math.round(progress) }}%
                  </p>
                </div>

                <!-- Live region pour lecteurs d’écran -->
                <span aria-live="polite" class="sr-only">
                  {{ t('components.panel.Dojo.progress') }}: {{ Math.round(progress) }}%, {{ t('components.panel.Dojo.duration.remaining') }} {{ remainingLabel }}
                </span>
              </div>
            </div>
          </UiAdaptiveDisplayer>
        </div>
      </div>

      <!-- Sélecteur -->
      <ShlagemonSelectModal
        v-model="selectorOpen"
        :title="t('components.panel.Dojo.selectMon')"
        title-id="dojo-select-title"
        @select="selectMon"
      />

      <!-- Sélecteur -->
      <UiModal v-model="selectorOpen" role="dialog" aria-modal="true" aria-labelledby="dojo-select-title">
        <div class="max-w-160 flex flex-col gap-2">
          <h3 id="dojo-select-title" class="text-center text-lg font-bold">
            {{ t('components.panel.Dojo.selectMon') }}
          </h3>
          <div class="max-h-80 min-h-0 overflow-y-auto">
            <ShlagemonQuickSelect @select="selectMon" />
          </div>
        </div>
      </UiModal>
    </template>
    <template #footer>
      <div class="w-full flex justify-end gap-1 md:flex-nowrap md:justify-end">
        <UiButton
          v-if="selected && !isRunning"
          :disabled="cost > game.shlagidolar || points < 1 || (safeMax === 1 && points === 1)"
          type="primary"
          class="flex flex-1 flex-wrap items-center gap-1"
          @click="start"
        >
          {{ t('components.panel.Dojo.cta.payAndStart') }}
          <UiCurrencyAmount :amount="cost" currency="shlagidolar" />
        </UiButton>
      </div>
    </template>
  </PanelPoiDialogFlow>
</template>

<style scoped>
/* Slider moderne — reste purgeable côté UnoCSS grâce aux utilitaires utilisés ailleurs */
.dojo-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 0.5rem;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.9), rgba(34, 197, 94, 0.5));
  outline: none;
}
.dojo-slider::-webkit-slider-runnable-track,
.dojo-slider::-moz-range-track {
  height: 0.5rem;
  border-radius: 9999px;
  background: transparent;
}
.dojo-slider::-webkit-slider-thumb,
.dojo-slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background: white;
  border: 2px solid rgb(34 197 94);
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
  cursor: pointer;
  transition:
    transform 0.12s ease,
    box-shadow 0.2s ease;
}
.dojo-slider::-webkit-slider-thumb:focus,
.dojo-slider::-webkit-slider-thumb:active,
.dojo-slider::-moz-range-thumb:focus,
.dojo-slider::-moz-range-thumb:active {
  transform: scale(1.05);
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.25);
}
/* Dark */
:where(html.dark) .dojo-slider {
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.35));
}
</style>
