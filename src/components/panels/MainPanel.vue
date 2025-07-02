<script setup lang="ts">
import BattleMain from '~/components/battle/BattleMain.vue'
import TrainerBattle from '~/components/battle/TrainerBattle.vue'
import DialogPanel from '~/components/panels/DialogPanel.vue'
import ShopPanel from '~/components/panels/ShopPanel.vue'
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
    case 'trainerBattle':
      return TrainerBattle
    default:
      return null
  }
})
</script>

<template>
  <DialogPanel v-if="dialogStore.isDialogVisible" />
  <component :is="currentComponent" v-else />
</template>
