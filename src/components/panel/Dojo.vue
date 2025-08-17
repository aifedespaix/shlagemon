<script setup lang="ts">
import type { DojoTrainingJob } from '~/stores/dojo'
import type { DialogNode } from '~/type/dialog'
import type { DexShlagemon } from '~/type/shlagemon'
import { computed, onMounted, ref, watch } from 'vue'
import { glandhi } from '~/data/characters/glandhi'
import { dojoTrainingCost, useDojoStore } from '~/stores/dojo'

const panel = useMainPanelStore()
const dojo = useDojoStore()
const game = useGameStore()
const dex = useShlagedexStore()
const busyIds = useBusyShlagemonIds()
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
        { label: t('components.ui.Infos.ok'), type: 'primary', action: next },
      ],
    },
  ]
}

const selected = ref<DexShlagemon | null>(null)
const selectorOpen = ref(false)
const points = ref<number>(1)
const clamp = (val: number, min: number, max: number): number => Math.min(max, Math.max(min, val))
const safeMax = computed<number>(() => (selected.value ? Math.max(1, 100 - selected.value.rarity) : 1))

const base = computed<number>(() => selected.value ? selected.value.rarity : 0)

const targetValue = computed<number>({
  get: () => clamp(base.value + points.value, base.value, base.value + safeMax.value),
  set: (target: number) => {
    const delta = target - base.value
    points.value = clamp(Math.round(delta), 0, safeMax.value)
  },
})

const job = computed(() => (selected.value ? dojo.getJob(selected.value.id) : null))
const isRunning = computed<boolean>(() => job.value?.status === 'running')
const isCompleted = computed<boolean>(() => job.value?.status === 'completed')

function createOutro(_: string | undefined, exit: () => void): DialogNode[] {
  const key = isRunning.value ? 'running' : 'idle'
  return [
    {
      id: 'outro',
      text: t(`components.panel.Dojo.outro.${key}`),
      responses: [
        { label: t('components.ui.Infos.ok'), type: 'valid', action: exit },
      ],
    },
  ]
}

function openSelector() {
  if (isRunning.value)
    return
  selectorOpen.value = true
}

watch(selected, () => {
  points.value = 1
})

const cost = computed<number>(() => (selected.value ? dojoTrainingCost(selected.value.rarity, clamp(points.value, 1, safeMax.value)) : 0))
const durationMin = computed<number>(() => clamp(points.value, 1, safeMax.value))

const remaining = computed<number>(() => {
  if (!job.value)
    return 0
  return Math.max(0, Math.ceil((job.value.endsAt - dojo.now) / 1000))
})
const progress = computed<number>(() => {
  if (!job.value)
    return 0
  const total = job.value.endsAt - job.value.startedAt
  const elapsed = Math.max(0, dojo.now - job.value.startedAt)
  return total > 0 ? Math.min(100, Math.max(0, (elapsed / total) * 100)) : 0
})

const remainingLabel = computed<string>(() => {
  const s = remaining.value
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
})

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
  targetValue.value = val
}
function setPointsFromNumber(val: number | string) {
  const n = typeof val === 'string' ? Number(val) : val
  targetValue.value = Number.isFinite(n) ? Math.trunc(n as number) : base.value
}
/** Raccourcis +/- via clavier pour affiner rapidement */

function start() {
  if (!selected.value)
    return
  dojo.startTraining(selected.value.id, selected.value.rarity, points.value)
}

function collect() {
  if (!selected.value)
    return
  if (dojo.collect(selected.value.id))
    selected.value = null
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
      <div class="min-h-0 w-full flex-1">
        <div class="h-full flex flex-1 flex-col items-center justify-center">
          <UiButton v-if="!selected" type="primary" class="aspect-square w-24" @click="openSelector">
            {{ t('components.panel.Dojo.selectMon') }}
          </UiButton>

          <UiAdaptiveDisplayer v-else class="w-full flex-1 gap-3 md:gap-4">
            <div class="flex-1 overflow-hidden">
              <DojoMonPreview
                v-if="selected"
                :mon="selected"
                :points="points"
                :show-preview="!isCompleted"
                class="h-full w-full"
                @click="openSelector"
              />
            </div>

            <div class="min-w-0 w-full flex flex-1 flex-col justify-center gap-3">
              <div class="flex flex-1 flex-col justify-center overflow-hidden">
                <DojoTrainingSetup
                  v-if="!isRunning"
                  :points="points"
                  :max-points="safeMax"
                  :cost="cost"
                  :duration-min="durationMin"
                  :shlagidolar="game.shlagidolar"
                  :ids="ids"
                  @slider-input="setPointsFromSlider"
                  @number-input="setPointsFromNumber"
                />

                <DojoTrainingProgress
                  v-if="job"
                  :is-running="isRunning"
                  :is-completed="isCompleted"
                  :progress="progress"
                  :remaining-label="remainingLabel"
                  :ids="{ progress: ids.progress }"
                />
              </div>
            </div>
          </UiAdaptiveDisplayer>

          <div v-if="selected && !job" class="w-full p-2">
            <UiSlider
              v-model="targetValue"
              :min="base"
              :max="base + safeMax"
              :step="1"
              unit=" points"
              :origin="0"
              name="points slider"
              :format="val => `+${val - base}`"
              @change="setPointsFromNumber"
            />
          </div>
        </div>
      </div>

      <!-- Sélecteur -->
      <ShlagemonSelectModal
        v-model="selectorOpen"
        :title="t('components.panel.Dojo.selectMon')"
        title-id="dojo-select-title"
        :disabled-ids="busyIds"
        @select="selectMon"
      />
    </template>
    <template #footer>
      <div class="w-full flex justify-end gap-1 md:flex-nowrap md:justify-end">
        <UiButton
          v-if="selected && !job"
          :disabled="cost > game.shlagidolar || points < 1 || (safeMax === 1 && points === 1)"
          type="primary"
          class="flex flex-1 flex-wrap items-center gap-1"
          @click="start"
        >
          {{ t('components.panel.Dojo.cta.payAndStart') }}
          <UiCurrencyAmount :amount="cost" currency="shlagidolar" />
        </UiButton>

        <UiButton
          v-if="isCompleted"
          type="primary"
          variant="outline"
          class="flex items-center gap-1"
          @click="collect"
        >
          {{ t('components.panel.Dojo.cta.collect') }}
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
