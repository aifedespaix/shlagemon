<script setup lang="ts">
import { useDialogStore } from '~/stores/dialog'
import { useMainPanelStore } from '~/stores/mainPanel'
import BattleMain from '../battle/Main.vue'
import BattleTrainer from '../battle/Trainer.vue'
import ArenaPanel from './Arena.vue'
import MiniGamePanel from './MiniGame.vue'
import PoulaillerPanel from './Poulailler.vue'
import ShopPanel from './Shop.vue'
import VillagePanel from './Village.vue'

defineOptions({ inheritAttrs: false })

const dialogStore = useDialogStore()
const panelStore = useMainPanelStore()

const currentComponent = computed(() => {
  switch (panelStore.current) {
    case 'shop':
      return ShopPanel
    case 'battle':
      return BattleMain
    case 'trainerBattle':
      return BattleTrainer
    case 'miniGame':
      return MiniGamePanel
    case 'arena':
      return ArenaPanel
    case 'poulailler':
      return PoulaillerPanel
    case 'village':
      return VillagePanel
    default:
      return VillagePanel
  }
})
</script>

<template>
  <PanelDialog v-if="dialogStore.isDialogVisible" v-bind="$attrs" />
  <component :is="currentComponent" v-else v-bind="$attrs" />
</template>
