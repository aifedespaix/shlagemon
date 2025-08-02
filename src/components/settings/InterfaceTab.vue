<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const interfaceStore = useInterfaceStore()
const { showVillagesOnMap } = storeToRefs(interfaceStore)
</script>

<template>
  <div class="flex flex-col gap-4">
    <UiCheckBox
      v-model="showVillagesOnMap"
      :label="t('components.settings.InterfaceTab.villagesOnMap')"
    />
  </div>
</template>
