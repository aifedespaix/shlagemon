<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { toast } from '~/modules/toast'
import { dojoTrainingCost, useDojoStore } from '~/stores/dojo'

/** === Stores / i18n ===================================================== */
const panel = useMainPanelStore()
const dojo = useDojoStore()
const game = useGameStore()
const { t } = useI18n()

/** === State ============================================================= */
const selected = ref<DexShlagemon | null>(null)
const selectorOpen = ref(false)
const points = ref<number>(1)
const now = ref<number>(Date.now())

/** Tick d'une seconde pour rafraîchir le “remaining” + progress */
const { pause: pauseTick } = useIntervalFn(() => {
  now.value = Date.now()
}, 1000)

onBeforeUnmount(() => {
  pauseTick()
})

/** === Derived =========================================================== */
const job = computed(() => (selected.value ? dojo.getJob(selected.value.id) : null))

/** Nombre max de points achetables (1..(100 - rarity)) */
const maxPoints = computed<number>(() => (selected.value ? Math.max(0, 100 - selected.value.rarity) : 0))

/** Clamp utilitaire et garde-fous */
function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val))
}

/** Recalibre les points à chaque changement de mon */
watch(selected, () => {
  points.value = clamp(1, 1, Math.max(1, maxPoints.value))
})

/** Coût, durée, progression */
const cost = computed<number>(() =>
  selected.value ? dojoTrainingCost(selected.value.rarity, clamp(points.value, 1, Math.max(1, maxPoints.value))) : 0,
)

const durationMin = computed<number>(() => clamp(points.value, 1, Math.max(1, maxPoints.value)))

const remaining = computed<number>(() => (job.value ? Math.max(0, Math.ceil(dojo.remainingMs(job.value.monId) / 1000)) : 0))

const progress = computed<number>(() => (job.value ? dojo.progressRatio(job.value.monId) * 100 : 0))

/** Auto-complete si terminé */
watch(now, () => {
  const mon = selected.value
  if (!mon)
    return
  if (dojo.completeIfDue(mon.id))
    toast.success(t('components.panel.Dojo.toast.finished'))
})

/** === Actions =========================================================== */
function openSelector() {
  selectorOpen.value = true
}

function selectMon(mon: DexShlagemon) {
  selected.value = mon
  selectorOpen.value = false
}

function setPointsFromSlider(val: number) {
  points.value = clamp(Math.round(val), 1, Math.max(1, maxPoints.value))
}

function setPointsFromNumber(val: number | string) {
  const n = typeof val === 'string' ? Number(val) : val
  points.value = clamp(Number.isFinite(n) ? Math.trunc(n) : 1, 1, Math.max(1, maxPoints.value))
}

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
  <LayoutTitledPanel
    :title="t('components.panel.Dojo.title')"
    :exit-text="t('components.panel.Dojo.cta.selectFirst')"
    @exit="panel.showVillage()"
  >
    <!-- Conteneur scrollable dans la hauteur dispo du parent -->
    <div class="min-h-0 flex flex-1">
      <div class="flex flex-1 flex-col gap-4 overflow-y-auto px-2 py-3 sm:px-3">
        <!-- CTA sélection si aucun mon -->
        <UiButton v-if="!selected" type="primary" class="mx-auto" @click="openSelector">
          {{ t('components.panel.Dojo.selectMon') }}
        </UiButton>

        <!-- Contenu principal -->
        <div v-else class="mx-auto max-w-120 w-full flex flex-col items-center gap-4">
          <ShlagemonImage
            :id="selected.base.id"
            :alt="t(selected.base.name)"
            class="h-32 w-32"
          />

          <!-- Rareté actuelle → ciblée -->
          <div class="text-sm">
            {{ t('components.panel.Dojo.rarity.current') }}:
            {{ selected.rarity }} → {{ Math.min(100, selected.rarity + points) }}
          </div>

          <!-- Contrôle Points: Slider + Number input synchronisés -->
          <div class="w-full flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label :for="ids.slider" class="text-sm font-medium">
                {{ t('components.panel.Dojo.points') }}
              </label>
              <span class="text-xs text-gray-500">
                {{ t('common.min') }} 1 · {{ t('common.max') }} {{ maxPoints }}
              </span>
            </div>

            <!-- Slider -->
            <input
              :id="ids.slider"
              type="range"
              class="dojo-slider w-full"
              :min="1"
              :max="Math.max(1, maxPoints)"
              :step="1"
              :value="clamp(points, 1, Math.max(1, maxPoints))"
              :aria-valuemin="1"
              :aria-valuemax="Math.max(1, maxPoints)"
              :aria-valuenow="clamp(points, 1, Math.max(1, maxPoints))"
              :aria-describedby="`${ids.cost} ${ids.duration}`"
              @input="setPointsFromSlider(($event.target as HTMLInputElement).valueAsNumber)"
            >

            <!-- Number input (UiNumberInput existant), compact -->
            <div class="w-28 self-end">
              <UiNumberInput
                :id="ids.number"
                v-model="points"
                :min="1"
                :max="Math.max(1, maxPoints)"
                :step="1"
                density="compact"
                @update:model-value="setPointsFromNumber"
              />
            </div>
          </div>

          <!-- Coût & durée -->
          <div class="grid grid-cols-1 w-full gap-2 sm:grid-cols-2">
            <div :id="ids.cost" class="text-sm">
              {{ t('components.panel.Dojo.cost.label') }}:
              <UiCurrencyAmount :amount="cost" currency="shlagidolar" />
            </div>
            <div :id="ids.duration" class="text-sm">
              {{ t('components.panel.Dojo.duration.label') }}:
              {{ durationMin }}
              {{ durationMin === 1 ? t('components.panel.Dojo.duration.minute') : t('components.panel.Dojo.duration.minutes') }}
            </div>
          </div>

          <!-- CTA démarrer / Suivi progression -->
          <UiButton
            v-if="!job"
            :disabled="cost > game.shlagidolar || points < 1 || maxPoints === 0"
            type="primary"
            class="w-full sm:w-auto"
            @click="start"
          >
            {{ t('components.panel.Dojo.cta.payAndStart') }}
          </UiButton>

          <div v-else class="w-full flex flex-col gap-2">
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
                class="will-change-[width] h-full rounded bg-green-500 transition-all duration-300"
                :style="{ width: `${progress}%` }"
              />
            </div>
            <p class="text-center text-sm">
              {{ t('components.panel.Dojo.duration.remaining') }}:
              {{ Math.ceil(remaining / 60) }}
              {{ t('components.panel.Dojo.duration.minutes') }}
            </p>

            <!-- Live-update discret pour lecteurs d'écran -->
            <span aria-live="polite" class="sr-only">
              {{ t('components.panel.Dojo.progress') }}: {{ Math.round(progress) }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sélecteur de mon -->
    <UiModal v-model="selectorOpen" role="dialog" aria-modal="true" aria-labelledby="dojo-select-title">
      <div class="max-w-160 flex flex-col gap-2">
        <h3 id="dojo-select-title" class="text-center text-lg font-bold">
          {{ t('components.panel.Dojo.selectMon') }}
        </h3>
        <!-- Conteneur scrollable sans dépendre du viewport -->
        <div class="max-h-80 min-h-0 overflow-y-auto">
          <ShlagemonQuickSelect @select="selectMon" />
        </div>
      </div>
    </UiModal>
  </LayoutTitledPanel>
</template>

<style scoped>
/* Slider moderne accessible, UnoCSS-friendly (on garde les utilitaires pour layout) */
.dojo-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 0.5rem;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.9), rgba(34, 197, 94, 0.5));
  outline: none;
}

/* Track */
.dojo-slider::-webkit-slider-runnable-track {
  height: 0.5rem;
  border-radius: 9999px;
  background: transparent;
}
.dojo-slider::-moz-range-track {
  height: 0.5rem;
  border-radius: 9999px;
  background: transparent;
}

/* Thumb */
.dojo-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background: white;
  border: 2px solid rgb(34 197 94); /* green-500 */
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
  cursor: pointer;
  transition:
    transform 0.12s ease,
    box-shadow 0.2s ease;
}
.dojo-slider::-webkit-slider-thumb:focus,
.dojo-slider::-webkit-slider-thumb:active {
  transform: scale(1.05);
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.25);
}
.dojo-slider::-moz-range-thumb {
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

/* Dark mode support pour le track */
:where(html.dark) .dojo-slider {
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.35));
}
</style>
