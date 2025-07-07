<script setup lang="ts">
import BattleMain from '~/components/battle/BattleMain.vue'
import TrainerBattle from '~/components/battle/TrainerBattle.vue'
import WhackAShlag from '~/components/minigame/WhackAShlag.vue'
import ArenaPanel from '~/components/panels/ArenaPanel.vue'
import DialogPanel from '~/components/panels/DialogPanel.vue'
import ShopPanel from '~/components/panels/ShopPanel.vue'
import VillagePanel from '~/components/village/VillagePanel.vue'
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
    case 'miniGame':
      return WhackAShlag
    case 'arena':
      return ArenaPanel
    case 'village':
      return VillagePanel
    default:
      return null
  }
})
</script>

<template>
  <DialogPanel v-if="dialogStore.isDialogVisible" />
  <component :is="currentComponent" v-else />
</template>
