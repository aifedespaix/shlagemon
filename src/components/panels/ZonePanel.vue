<script setup lang="ts">
import type { Zone } from '~/type'
import { computed } from 'vue'
import Button from '~/components/ui/Button.vue'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useTrainerBattleStore } from '~/stores/trainerBattle'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'

const zone = useZoneStore()
const dex = useShlagedexStore()
const panel = useMainPanelStore()
const progress = useZoneProgressStore()
const trainerBattle = useTrainerBattleStore()

const xpZones = computed(() => zone.zones.filter(z => z.maxLevel > 0))

function canAccess(z: Zone) {
  if (z.type === 'village')
    return z.minLevel <= dex.highestLevel
  const idx = xpZones.value.findIndex(x => x.id === z.id)
  if (idx === 0)
    return dex.highestLevel >= z.minLevel
  const prev = xpZones.value[idx - 1]
  return dex.highestLevel >= z.minLevel && progress.isKingDefeated(prev.id)
}

function onAction(id: string) {
  if (id === 'shop')
    panel.showShop()
  else if (id === 'explore')
    panel.showTrainerBattle()
}

function fightKing() {
  const trainer = zone.getKing(zone.current.id)
  trainerBattle.setQueue([trainer])
  panel.showTrainerBattle()
}

function classes(z: Zone) {
  const classes = []
  z.id === zone.current.id ? classes.push('bg-primary text-dark dark:bg-light') : classes.push('bg-gray-200 dark:bg-gray-700')
  if (z.type === 'village') {
    classes.push('bg-green-300 dark:bg-green-800')
  }
  return classes.join(' ')
}
</script>

<template>
  <div class="flex flex-col gap-2" md="gap-3">
    <div class="flex flex-wrap justify-center gap-1" md="gap-2">
      <button
        v-for="z in zone.zones"
        :key="z.id"
        class="rounded px-2 py-1 text-xs"
        :class="[classes(z), { 'opacity-50 cursor-not-allowed': !canAccess(z) }]"
        :disabled="!canAccess(z)"
        @click="zone.setZone(z.id)"
      >
        {{ z.name }}
      </button>
    </div>
    <div class="flex flex-col items-center gap-1" md="gap-2">
      <Button
        v-for="action in zone.current.actions"
        :key="action.id"
        class="text-xs"
        @click="onAction(action.id)"
      >
        {{ action.label }}
      </Button>
      <Button
        v-if="!progress.isKingDefeated(zone.current.id) && progress.canFightKing(zone.current.id)"
        class="text-xs"
        @click="fightKing"
      >
        Vaincre le roi de la zone
      </Button>
      <div v-else-if="progress.isKingDefeated(zone.current.id)" class="text-xs font-bold">
        Roi vaincu !
      </div>
    </div>
  </div>
</template>
