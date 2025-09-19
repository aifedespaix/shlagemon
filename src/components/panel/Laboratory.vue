<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { profMerdant } from '~/data/characters/prof-merdant'

const panel = useMainPanelStore()
const zone = useZoneStore()
const laboratory = useLaboratoryStore()
const { unlocked } = storeToRefs(laboratory)
const { t } = useI18n()

const isUnlocked = computed(() => unlocked.value)

function exitPanel() {
  zone.setZone('cratere-des-legends')
  panel.showBattle()
}
</script>

<template>
  <LayoutTitledPanel
    :title="t('components.panel.Laboratory.title')"
    :exit-text="t('components.panel.Laboratory.exit')"
    @exit="exitPanel"
  >
    <div v-if="isUnlocked" class="h-full flex flex-1 flex-col gap-4" md="gap-6">
      <div class="flex flex-col items-center gap-4" md="flex-row md:items-start md:gap-6">
        <CharacterImage
          :id="profMerdant.id"
          alt="Professeur Merdant"
          class="h-32 w-32 shrink-0 md:h-40 md:w-40"
        />
        <div class="flex flex-1 flex-col gap-3 text-sm" md="text-base">
          <p>{{ t('components.panel.Laboratory.intro') }}</p>
          <UiInfo color="info">
            {{ t('components.panel.Laboratory.focus') }}
          </UiInfo>
          <p>{{ t('components.panel.Laboratory.cta') }}</p>
        </div>
      </div>
    </div>
    <div v-else class="h-full flex flex-1 items-center justify-center">
      <UiInfo color="alert">
        {{ t('components.panel.Laboratory.locked') }}
      </UiInfo>
    </div>
  </LayoutTitledPanel>
</template>
