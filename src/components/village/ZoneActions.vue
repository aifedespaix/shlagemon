<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/ui/Button.vue'
import { useArenaStore } from '~/stores/arena'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useTrainerBattleStore } from '~/stores/trainerBattle'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'

const zone = useZoneStore()
const panel = useMainPanelStore()
const progress = useZoneProgressStore()
const trainerBattle = useTrainerBattleStore()
const arena = useArenaStore()

const hasKing = computed(() =>
  zone.current.hasKing ?? zone.current.type === 'sauvage',
)
const hasArena = computed(() => !!zone.current.arena)
const arenaCompleted = computed(() => progress.isArenaCompleted(zone.current.id))
const currentKing = computed(() =>
  hasKing.value ? zone.getKing(zone.current.id) : undefined,
)
const kingLabel = computed(() =>
  currentKing.value?.character.gender === 'female' ? 'reine' : 'roi',
)

function onAction(id: string) {
  if (arena.inBattle)
    return
  if (id === 'shop') {
    panel.showShop()
  }
  else if (id === 'explore') {
    panel.showTrainerBattle()
  }
  else if (id === 'minigame') {
    panel.showMiniGame()
  }
}

function openArena() {
  if (arena.inBattle)
    return
  const data = zone.current.arena?.arena
  if (data)
    arena.setArena(data)
  panel.showArena()
}

function fightKing() {
  if (arena.inBattle)
    return
  const trainer = currentKing.value
  if (!trainer)
    return
  trainerBattle.setQueue([trainer])
  panel.showTrainerBattle()
}
</script>

<template>
  <div class="flex flex-col items-center gap-1" md="gap-2">
    <Button
      v-for="action in zone.current.actions"
      :key="action.id"
      class="text-xs"
      :disabled="arena.inBattle"
      @click="onAction(action.id)"
    >
      {{ action.label }}
    </Button>
    <Button
      v-if="hasArena && !arenaCompleted"
      class="text-xs"
      :disabled="arena.inBattle"
      @click="openArena"
    >
      Arène
    </Button>
    <Button
      v-if="hasKing && !progress.isKingDefeated(zone.current.id) && progress.canFightKing(zone.current.id)"
      class="text-xs"
      :disabled="arena.inBattle"
      @click="fightKing"
    >
      Défier la {{ kingLabel }} de la zone
    </Button>
    <div
      v-else-if="hasKing && progress.isKingDefeated(zone.current.id)"
      class="text-xs font-bold"
    >
      {{ kingLabel.charAt(0).toUpperCase() + kingLabel.slice(1) }}
      vaincu{{ kingLabel === 'reine' ? 'e' : '' }} !
    </div>
  </div>
</template>
