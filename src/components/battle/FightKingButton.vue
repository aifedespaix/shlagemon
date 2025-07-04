<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/ui/Button.vue'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useTrainerBattleStore } from '~/stores/trainerBattle'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'

const panel = useMainPanelStore()
const trainerBattle = useTrainerBattleStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()

const currentKing = computed(() => zone.getKing(zone.current.id))
const kingLabel = computed(() =>
  currentKing.value!.character.gender === 'female' ? 'la reine' : 'le roi',
)

const visible = computed(() =>
  !progress.isKingDefeated(zone.current.id)
  && progress.canFightKing(zone.current.id),
)

function fightKing() {
  const trainer = zone.getKing(zone.current.id)
  if (!trainer)
    throw new Error('King not found')
  trainerBattle.setQueue([trainer])
  panel.showTrainerBattle()
}
</script>

<template>
  <Button
    v-if="visible"
    class="absolute right-0 top-6 z-150 m-1 flex gap-2 text-xs"
    type="danger"
    @click="fightKing"
  >
    <div>Défier {{ kingLabel }}</div>

    <div class="i-mdi:sword" />
  </Button>
</template>
