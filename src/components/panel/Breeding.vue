<script setup lang="ts">
import type { EggType } from '~/stores/egg'
import type { DexShlagemon } from '~/type/shlagemon'

import { toast } from '~/modules/toast'
import { BREEDING_DURATION_MS, breedingCost } from '~/utils/breeding'

/** === Stores / i18n ===================================================== */
const { t } = useI18n()
const breeding = useBreedingStore()
const game = useGameStore()
const panel = useMainPanelStore()

/** === State ============================================================= */
const selected = ref<DexShlagemon | null>(null)
const selectorOpen = ref(false)
const now = ref<number>(Date.now())

/** === Derived =========================================================== */
const eggType = computed<EggType | null>(() =>
  selected.value ? selected.value.base.types[0].id as EggType : null,
)
const job = computed(() => (eggType.value ? breeding.getJob(eggType.value) : null))
const isRunning = computed<boolean>(() => (eggType.value ? breeding.isRunning(eggType.value) : false))
const isCompleted = computed<boolean>(() => job.value?.status === 'completed')
const cost = computed<number>(() => (selected.value ? breedingCost(selected.value.rarity) : 0))
const durationMin = Math.round(BREEDING_DURATION_MS / 60000)
const remaining = computed<number>(() => {
  void now.value
  return eggType.value ? breeding.remainingMs(eggType.value) : 0
})
const progress = computed<number>(() => {
  void now.value
  return eggType.value ? breeding.progress(eggType.value) * 100 : 0
})
const remainingLabel = computed<string>(() => {
  const total = Math.ceil(remaining.value / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
})

/** === Actions =========================================================== */
function openSelector() {
  if (isRunning.value)
    return
  selectorOpen.value = true
}
function selectMon(mon: DexShlagemon) {
  selected.value = mon
  selectorOpen.value = false
}
function changeMon() {
  if (isRunning.value)
    return
  selected.value = null
  openSelector()
}
function start() {
  if (!eggType.value || !selected.value)
    return
  if (breeding.start(eggType.value, selected.value.rarity, selected.value.base.id))
    toast.success(t('components.panel.Breeding.toast.started'))
}
function collect() {
  if (!eggType.value)
    return
  if (breeding.collectEgg(eggType.value)) {
    toast.success(t('components.panel.Breeding.toast.collected'))
    selected.value = null
    openSelector()
  }
}

/** === Tick ============================================================== */
const { pause: pauseTick } = useIntervalFn(() => {
  now.value = Date.now()
  if (eggType.value && breeding.completeIfDue(eggType.value))
    toast.success(t('components.panel.Breeding.toast.finished'))
}, 1000)
onBeforeUnmount(pauseTick)
</script>

<template>
  <LayoutTitledPanel
    :title="t('components.panel.Breeding.title')"
    :exit-text="t('components.panel.Breeding.exit')"
    @exit="panel.showVillage()"
  >
    <div class="min-h-0 flex-1">
      <div class="h-full flex flex-1 items-center justify-center overflow-y-auto px-2 py-3 sm:px-3">
        <UiButton v-if="!selected" type="primary" class="aspect-square w-24" @click="openSelector">
          {{ t('components.panel.Breeding.selectMon') }}
        </UiButton>

        <UiAdaptiveDisplayer v-else class="area-grid h-full w-full gap-3 md:gap-4">
          <div class="min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
            <div class="relative h-full w-full flex items-center justify-center">
              <ShlagemonImage
                :id="selected.base.id"
                :alt="t(selected.base.name)"
                :shiny="selected.isShiny"
                class="h-full w-full object-contain transition-transform duration-300 will-change-transform"
              />
              <div class="pointer-events-none absolute left-2 top-2 flex gap-2">
                <span
                  class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 font-medium dark:bg-emerald-900/50 dark:text-emerald-200"
                  aria-label="{{ t('components.panel.Breeding.rarity') }}"
                >
                  {{ t('components.panel.Breeding.rarity') }}: {{ selected.rarity }}
                </span>
                <span
                  class="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900 font-medium dark:bg-amber-900/50 dark:text-amber-100"
                  aria-label="{{ t('components.panel.Breeding.eggType') }}"
                >
                  {{ t('components.panel.Breeding.eggType') }}: {{ eggType }}
                </span>
              </div>
            </div>
          </div>

          <div class="min-w-0 flex flex-1 flex-col gap-3">
            <div v-if="!isRunning" class="w-full flex flex-col items-center gap-2">
              <div class="flex items-center gap-1 text-sm">
                <span class="text-gray-500 dark:text-gray-400">{{ t('components.panel.Breeding.cost') }}:</span>
                <UiCurrencyAmount :amount="cost" currency="shlagidolar" />
              </div>
              <div class="text-sm">
                <span class="text-gray-500 dark:text-gray-400">{{ t('components.panel.Breeding.duration') }}:</span>
                <span class="ml-1">{{ durationMin }}</span>
                <span class="ml-1">{{ t('components.panel.Breeding.minutes') }}</span>
              </div>
            </div>

            <div v-if="job" class="w-full border border-gray-200 rounded-xl p-3 dark:border-gray-700">
              <div v-if="isRunning" class="w-full rounded-lg bg-amber-50 px-3 py-2 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
                {{ t('components.panel.Breeding.status.running') }} — {{ t('components.panel.Breeding.remaining') }}:
                <span class="tabular-nums">{{ remainingLabel }}</span>
              </div>
              <div
                class="h-2 w-full rounded bg-gray-300 dark:bg-gray-700"
                role="progressbar"
                :aria-label="t('components.panel.Breeding.progress')"
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
                  {{ t('components.panel.Breeding.remaining') }}:
                  <span class="tabular-nums">{{ remainingLabel }}</span>
                </p>
                <p class="text-gray-500 dark:text-gray-400">
                  {{ Math.round(progress) }}%
                </p>
              </div>

              <span aria-live="polite" class="sr-only">
                {{ t('components.panel.Breeding.progress') }}: {{ Math.round(progress) }}%,
                {{ t('components.panel.Breeding.remaining') }} {{ remainingLabel }}
              </span>
            </div>
          </div>
        </UiAdaptiveDisplayer>
      </div>
    </div>

    <UiModal v-model="selectorOpen" role="dialog" aria-modal="true" aria-labelledby="breeding-select-title">
      <div class="max-w-160 flex flex-col gap-2">
        <h3 id="breeding-select-title" class="text-center text-lg font-bold">
          {{ t('components.panel.Breeding.selectMon') }}
        </h3>
        <div class="max-h-80 min-h-0 overflow-y-auto">
          <ShlagemonQuickSelect @select="selectMon" />
        </div>
      </div>
    </UiModal>

    <template #footer>
      <div class="w-full flex flex-wrap gap-2 bg-white md:flex-nowrap md:justify-end dark:bg-gray-900">
        <UiButton
          v-if="selected && !isRunning"
          :disabled="cost > game.shlagidolar"
          type="primary"
          class="flex flex-1 flex-wrap items-center gap-1"
          @click="start"
        >
          {{ t('components.panel.Breeding.cta.payAndStart') }}
          <UiCurrencyAmount :amount="cost" currency="shlagidolar" />
        </UiButton>

        <UiButton
          v-if="selected && !isRunning"
          type="secondary"
          variant="outline"
          class="w-full md:w-auto"
          @click="changeMon"
        >
          {{ t('components.panel.Breeding.cta.changeMon') }}
        </UiButton>

        <UiButton
          v-if="isCompleted"
          type="primary"
          variant="outline"
          class="w-full md:w-auto"
          @click="collect"
        >
          {{ t('components.panel.Breeding.cta.collectEgg') }}
        </UiButton>

        <UiButton
          type="danger"
          variant="outline"
          class="w-full md:w-auto"
          size="xs"
          @click="panel.showVillage()"
        >
          <div class="i-carbon:exit" />
          {{ t('components.panel.Breeding.exit') }}
        </UiButton>
      </div>
    </template>
  </LayoutTitledPanel>
</template>
