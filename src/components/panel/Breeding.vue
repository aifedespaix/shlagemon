<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { eggColorClass } from '~/constants/egg'
import { norman } from '~/data/characters/norman'

const { t } = useI18n()
const breeding = useBreedingStore()
const panel = useMainPanelStore()
const busyIds = useBusyShlagemonIds()

const selectorOpen = ref(false)

onMounted(() => {
  // ✅ Si un job existe (running ou terminé), on force la sélection du mon lié
  breeding.ensureSelectionFromJobs()
})

function onExit() {
  panel.showVillage()
}

function createIntro(next: () => void): DialogNode[] {
  return [
    {
      id: 'intro',
      text: t('components.panel.Breeding.intro'),
      responses: [{ label: t('components.ui.Infos.ok'), type: 'primary', action: next }],
    },
  ]
}

function createOutro(_: string | undefined, exit: () => void): DialogNode[] {
  const key = breeding.isRunningSelected ? 'running' : 'idle'
  return [
    {
      id: 'outro',
      text: t(`components.panel.Breeding.outro.${key}`),
      responses: [{ label: t('components.ui.Infos.ok'), type: 'valid', action: exit }],
    },
  ]
}

/** UI */
function openSelector() {
  if (breeding.activeJob)
    return // verrou pendant un job (running/completed non collecté)
  selectorOpen.value = true
}
function selectMon(mon: Readonly<{ id: string }>) {
  breeding.setSelected(mon.id)
  selectorOpen.value = false
}
function changeMon() {
  if (breeding.activeJob)
    return
  breeding.setSelected(null)
  openSelector()
}
function start() {
  if (!breeding.canStartSelected)
    return
  breeding.startSelected()
}
function collect() {
  if (!breeding.activeEggType || !breeding.isCompletedSelected)
    return
  breeding.collectEgg(breeding.activeEggType)
}
</script>

<template>
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
              :mon="breeding.selectedMon"
              :egg-type="breeding.activeEggType"
              class="flex-1"
              @select="openSelector"
              @change="changeMon"
            />

            <div class="flex-1">
              <BreedingCharacter
                :character="norman"
                :typing-text="breeding.typingText"
              />
            </div>
          </UiAdaptiveDisplayer>

          <!-- ✅ Si un job (running OU terminé non collecté) existe,
               on affiche l’état job plutôt que l’état "infos". -->
          <BreedingWorking
            v-if="breeding.activeJob"
            :is-running="breeding.isRunningSelected"
            :progress="breeding.selectedProgressPercent"
            :remaining-label="breeding.selectedRemainingLabel"
          />
          <BreedingInfos
            v-else
            :selected="breeding.selectedMon"
            :cost="breeding.selectedCost"
            :duration-min="breeding.durationMin"
          />
        </div>

        <ShlagemonSelectModal
          v-model="selectorOpen"
          :title="t('components.panel.Breeding.selectMon')"
          title-id="breeding-select-title"
          :disabled-ids="busyIds"
          @select="selectMon"
        />
      </div>
    </template>

    <template #footer>
      <div class="w-full flex justify-end gap-2">
        <!-- Start -->
        <UiButton
          v-if="breeding.selectedMon && !breeding.activeJob"
          :disabled="!breeding.canStartSelected"
          type="primary"
          class="flex flex-1 flex-wrap items-center gap-1"
          @click="start"
        >
          {{ t('components.panel.Breeding.cta.payAndStart') }}
          <UiCurrencyAmount :amount="breeding.selectedCost" currency="shlagidolar" />
        </UiButton>

        <!-- Collect -->
        <UiButton
          v-if="breeding.isCompletedSelected"
          type="primary"
          variant="outline"
          class="flex items-center gap-1"
          @click="collect"
        >
          <div
            class="i-game-icons:cosmic-egg"
            :class="breeding.activeEggType ? eggColorClass(breeding.activeEggType) : ''"
            aria-hidden="true"
          />
          <span :class="breeding.activeEggType ? eggColorClass(breeding.activeEggType) : ''">
            {{ t('components.panel.Breeding.cta.collectEgg') }}
          </span>
        </UiButton>
      </div>
    </template>
  </PanelPoiDialogFlow>
</template>
