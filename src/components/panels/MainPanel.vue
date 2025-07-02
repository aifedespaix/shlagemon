<script setup lang="ts">
import BattleMain from '~/components/battle/BattleMain.vue'
import DialogPanel from '~/components/panels/DialogPanel.vue'
import ShopPanel from '~/components/panels/ShopPanel.vue'
import ZonePanel from '~/components/panels/ZonePanel.vue'
import { useDialogStore } from '~/stores/dialog'
import { useMainPanelStore } from '~/stores/mainPanel'

const dialogStore = useDialogStore()
const panelStore = useMainPanelStore()

const currentComponent = computed(() => {
  switch (panelStore.current) {
    case 'shop':
      return ShopPanel
    case 'battle':
      return BattleMain
    default:
      return ZonePanel
  }
})
</script>

<template>
  <DialogPanel v-if="dialogStore.isDialogVisible" />
  <component :is="currentComponent" v-else />
</template>
