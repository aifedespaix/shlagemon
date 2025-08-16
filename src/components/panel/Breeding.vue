<script setup lang="ts">
import type { EggType } from '~/stores/egg'
import type { DialogNode } from '~/type/dialog'

import type { DexShlagemon } from '~/type/shlagemon'
import { eggColorClass } from '~/constants/egg'
import { norman } from '~/data/characters/norman'
import { BREEDING_DURATION_MS, breedingCost } from '~/utils/breeding'

/** === Stores / i18n ===================================================== */
const { t, tm } = useI18n()
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
        { label: t('components.ui.Infos.ok'), type: 'primary', action: next },
      ],
    },
  ]
}

/** === State ============================================================= */
const selected = ref<DexShlagemon | null>(null)
const selectorOpen = ref(false)
const typingText = ref('')

/** === Derived =========================================================== */
const eggType = computed<EggType | null>(() =>
  selected.value ? selected.value.base.types[0].id as EggType : null,
)
const job = computed(() => (eggType.value ? breeding.getJob(eggType.value) : null))
const isRunning = computed<boolean>(() => job.value?.status === 'running')
const isCompleted = computed<boolean>(() => job.value?.status === 'completed')
const cost = computed<number>(() => (selected.value ? breedingCost(selected.value.rarity) : 0))
const durationMin = Math.round(BREEDING_DURATION_MS / 60000)
const remaining = computed<number>(() => eggType.value ? breeding.remainingMs(eggType.value) : 0)
const progress = computed<number>(() => eggType.value ? breeding.progress(eggType.value) * 100 : 0)
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
        { label: t('components.ui.Infos.ok'), type: 'valid', action: exit },
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
  breeding.start(eggType.value, selected.value.rarity, selected.value.base.id)
}
function collect() {
  if (!eggType.value)
    return
  if (breeding.collectEgg(eggType.value))
    selected.value = null
}

function randomIndex(list: unknown[]) {
  return Math.floor(Math.random() * list.length)
}

watch([selected, isCompleted], () => {
  if (isCompleted.value) {
    const msgs = tm('components.panel.Breeding.during.completed') as string[]
    const i = randomIndex(msgs)
    typingText.value = t(`components.panel.Breeding.during.completed.${i}`)
  }
  else if (!selected.value) {
    typingText.value = t('components.panel.Breeding.during.unselected')
  }
  else {
    const msgs = tm('components.panel.Breeding.during.selected') as string[]
    const i = randomIndex(msgs)
    typingText.value = t(`components.panel.Breeding.during.selected.${i}`, {
      shlagemon_name: t(selected.value.base.name),
    })
  }
}, { immediate: true })
</script>

<template>
  <!-- Avoid replacing breeding music with the character theme -->
  <PanelPoiDialogFlow
    :title="t('components.panel.Breeding.title')"
    :exit-text="t('components.panel.Breeding.exit')"
    :character="norman"
    :create-intro="createIntro"
    :create-outro="createOutro"
    :play-character-track="false"
    @exit="onExit"
  >
    <template #default>
      <div class="min-h-0 w-full flex-1">
        <div class="h-full flex flex-1 flex-col items-center justify-center gap-1 overflow-y-auto">
          <UiAdaptiveDisplayer class="area-grid h-full w-full gap-3 md:gap-4">
            <BreedingMonPreview
              :mon="selected"
              :egg-type="eggType"
              class="flex-1"
              @select="openSelector"
              @change="changeMon"
            />

            <div class="flex-1">
              <BreedingCharacter
                :character="norman"
                :typing-text="typingText"
              />
            </div>
          </UiAdaptiveDisplayer>
          <BreedingWorking
            v-if="job"
            :is-running="isRunning"
            :progress="progress"
            :remaining-label="remainingLabel"
          />
          <BreedingInfos
            v-else
            :selected="selected"
            :cost="cost"
            :duration-min="durationMin"
          />
        </div>

        <!-- Sélecteur -->
        <ShlagemonSelectModal
          v-model="selectorOpen"
          :title="t('components.panel.Breeding.selectMon')"
          title-id="breeding-select-title"
          @select="selectMon"
        />
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
          class="flex items-center gap-1"
          @click="collect"
        >
          <div class="i-game-icons:cosmic-egg" :class="eggType ? eggColorClass(eggType) : ''" aria-hidden="true" />
          <span :class="eggType ? eggColorClass(eggType) : ''">
            {{ t('components.panel.Breeding.cta.collectEgg') }}
          </span>
        </UiButton>
      </div>
    </template>
  </PanelPoiDialogFlow>
</template>
