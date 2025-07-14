<script setup lang="ts">
import { useDialogStore } from '~/stores/dialog'
import { useMainPanelStore } from '~/stores/mainPanel'

defineOptions({ inheritAttrs: false })

const dialogStore = useDialogStore()
const panelStore = useMainPanelStore()

const currentComponent = computed(() => {
  switch (panelStore.current) {
    case 'shop':
      return 'ShopPanel'
    case 'battle':
      return 'BattleMain'
    case 'trainerBattle':
      return 'TrainerBattle'
    case 'miniGame':
      return 'WhackAShlag'
    case 'arena':
      return 'ArenaPanel'
    case 'village':
      return 'VillagePanel'
    default:
      return 'VillagePanel'
  }
})
</script>

<template>
  <DialogPanel v-if="dialogStore.isDialogVisible" v-bind="$attrs" />
  <component :is="currentComponent" v-else v-bind="$attrs" />
</template>
