<script setup lang="ts">
import type { Zone } from '~/type'
import { computed } from 'vue'
import Button from '~/components/ui/Button.vue'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneStore } from '~/stores/zone'

const zone = useZoneStore()
const dex = useShlagedexStore()
const panel = useMainPanelStore()

const availableZones = computed(() =>
  zone.zones.filter(z => (z.type === 'village' && z.minLevel <= dex.highestLevel) || dex.highestLevel >= z.minLevel),
)

function onAction(id: string) {
  if (id === 'shop')
    panel.showShop()
  else if (id === 'explore')
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
        v-for="z in availableZones"
        :key="z.id"
        class="rounded px-2 py-1 text-xs"
        :class="classes(z)"
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
    </div>
  </div>
</template>
