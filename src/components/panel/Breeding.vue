<script setup lang="ts">
import type { EggType } from '~/stores/egg'
import type { DialogNode } from '~/type/dialog'

import type { DexShlagemon } from '~/type/shlagemon'
import { norman } from '~/data/characters/norman'
import { toast } from '~/modules/toast'
import { BREEDING_DURATION_MS, breedingCost } from '~/utils/breeding'

/** === Stores / i18n ===================================================== */
const { t } = useI18n()
const breeding = useBreedingStore()
const game = useGameStore()
const panel = useMainPanelStore()

function onExit() {
  panel.showVillage()
}

function createIntro(next: () => void): DialogNode[] {
  return [
    {
      id: 'intro',
      text: t('components.panel.Breeding.intro'),
      responses: [
        { label: t('ui.Info.ok'), type: 'primary', action: next },
      ],
    },
  ]
}

/** === State ============================================================= */
const selected = ref<DexShlagemon | null>(null)
const selectorOpen = ref(false)
const now = ref<number>(Date.now())

/** === Derived =========================================================== */
const eggType = computed<EggType | null>(() =>
  selected.value ? selected.value.base.types[0].id as EggType : null,
)
const job = computed(() => (eggType.value ? breeding.getJob(eggType.value) : null))
const isRunning = computed<boolean>(() => job.value?.status === 'running')
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

function createOutro(_: string | undefined, exit: () => void): DialogNode[] {
  const key = isRunning.value ? 'running' : 'idle'
  return [
    {
      id: 'outro',
      text: t(`components.panel.Breeding.outro.${key}`),
      responses: [
        { label: t('ui.Info.ok'), type: 'valid', action: exit },
      ],
    },
  ]
}

/** === Actions =========================================================== */
function openSelector() {
  if (job.value)
    return
  selectorOpen.value = true
}
function selectMon(mon: DexShlagemon) {
  selected.value = mon
  selectorOpen.value = false
}
function changeMon() {
  if (job.value)
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
  <PanelPoiDialogFlow
    :title="t('components.panel.Breeding.title')"
    :exit-text="t('components.panel.Breeding.exit')"
    :character="norman"
    :create-intro="createIntro"
    :create-outro="createOutro"
    @exit="onExit"
  >
    <template #default>
      <div class="min-h-0 w-full flex-1">
        <div class="h-full flex flex-1 items-center justify-center overflow-y-auto px-2 py-3 sm:px-3">
          <!-- On garde toujours la grille adaptative -->
          <UiAdaptiveDisplayer class="area-grid h-full w-full gap-3 md:gap-4">
            <!-- Carte gauche : visuel Shlagémon OU bouton de sélection -->
            <div
              class="min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl bg-gray-50 p-3 dark:bg-gray-800"
              :class="selected ? 'cursor-pointer' : ''"
              @click="selected ? changeMon() : null"
            >
              <div class="relative h-full w-full flex items-center justify-center">
                <!-- Si sélectionné: image + badges -->
                <template v-if="selected">
                  <ShlagemonImage
                    :id="selected.base.id"
                    :alt="t(selected.base.name)"
                    :shiny="selected.isShiny"
                    class="h-full w-full object-contain transition-transform duration-300 will-change-transform"
                  />
                  <div class="pointer-events-none absolute left-2 top-2 flex gap-2">
                    <span
                      class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 font-medium dark:bg-emerald-900/50 dark:text-emerald-200"
                      :aria-label="t('components.panel.Breeding.rarity')"
                    >
                      {{ t('components.panel.Breeding.rarity') }}: {{ selected.rarity }}
                    </span>
                    <span
                      class="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900 font-medium dark:bg-amber-900/50 dark:text-amber-100"
                      :aria-label="t('components.panel.Breeding.eggType')"
                    >
                      {{ t('components.panel.Breeding.eggType') }}: {{ eggType }}
                    </span>
                  </div>
                </template>

                <!-- Si pas sélectionné: bouton à la place de l'image -->
                <template v-else>
                  <UiButton
                    type="primary"
                    class="aspect-square w-24"
                    @click.stop="openSelector"
                  >
                    {{ t('components.panel.Breeding.selectMon') }}
                  </UiButton>
                </template>
              </div>
            </div>

            <!-- Colonne droite : infos / progression / Norman -->
            <UiAdaptiveDisplayer class="area-grid h-full min-w-0 w-full flex-1 gap-3 md:gap-4">
              <!-- Sous-colonne gauche : infos coût/durée/progression + message -->
              <div class="min-w-0 w-full flex flex-col gap-3 md:w-2/3">
                <!-- Bloc coût/durée seulement si un mon est sélectionné et que ça ne tourne pas -->
                <div v-if="selected && !job" class="w-full flex flex-col items-center gap-2">
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

                <!-- Progression si un job existe -->
                <div class="flex flex-col gap-2">
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

                <UiTypingText
                  :text="t('components.panel.Breeding.during.typing')"
                  :aria-label="t('components.panel.Breeding.a11y.normanCareMessage')"
                  aria-live="polite"
                  class="text-sm"
                />
              </div>

              <!-- Sous-colonne droite : image de Norman -->
              <div class="h-full w-full md:w-1/3">
                <CharacterImage :id="norman.id" :alt="norman.name" class="h-full w-full object-contain" />
              </div>
            </UiAdaptiveDisplayer>
          </UiAdaptiveDisplayer>
        </div>

        <!-- Sélecteur -->
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
      </div>
    </template>
    <template #footer>
      <div class="w-full flex justify-end gap-2">
        <UiButton
          v-if="selected && !job"
          :disabled="cost > game.shlagidolar"
          type="primary"
          class="flex flex-1 flex-wrap items-center gap-1"
          @click="start"
        >
          {{ t('components.panel.Breeding.cta.payAndStart') }}
          <UiCurrencyAmount :amount="cost" currency="shlagidolar" />
        </UiButton>

        <UiButton
          v-if="isCompleted"
          type="primary"
          variant="outline"
          @click="collect"
        >
          {{ t('components.panel.Breeding.cta.collectEgg') }}
        </UiButton>
      </div>
    </template>
  </PanelPoiDialogFlow>
</template>
