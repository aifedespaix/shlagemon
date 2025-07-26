<script setup lang="ts">
import ZoneActions from '../village/ZoneActions.vue'

const zone = useZoneStore()
const panel = useMainPanelStore()
const { t } = useI18n()

function leaveVillage() {
  if (zone.current.attachedTo)
    zone.setZone(zone.current.attachedTo)
  panel.showBattle()
}
</script>

<template>
  <LayoutTitledPanel
    :title="zone.current.name"
    :exit-text="t('components.panel.Village.exit')"
    @exit="leaveVillage"
  >
    <div class="flex flex-col items-center gap-2">
      <UiImageByBackground
        v-if="zone.current.image"
        :src="zone.current.image"
        :alt="zone.current.name"
        class="aspect-video h-full max-h-60 w-full object-contain md:max-h-80"
      />
      <ZoneActions />
    </div>
  </LayoutTitledPanel>
</template>
