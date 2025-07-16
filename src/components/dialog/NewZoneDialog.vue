<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'
import { useMobileTabStore } from '~/stores/mobileTab'
import { useZoneVisitStore } from '~/stores/zoneVisit'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()
const visit = useZoneVisitStore()
const mobile = useMobileTabStore()

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Bien joué ! Tu as dégommé le boss et débloqué une nouvelle zone.',
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: 'Pour faire progresser tes Shlagémons et découvrir d\'autres horreurs, balade-toi dans la zone qui vient d\'ouvrir.',
    responses: [
      { label: 'Retour', nextId: 'start', type: 'danger' },
      { label: 'Suite', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Souviens-toi, un Shlagémon ne peut pas dépasser le niveau maximal de la zone où tu te trouves.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Suite', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Explore d\'autres endroits pour continuer à les faire évoluer. Tiens, prends cette Potion d\'Expérience, j\'en ai qu\'une !',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      {
        label: 'Merci Professeur !',
        type: 'valid',
        action: () => {
          inventory.add('xp-potion', 1)
          visit.markAllAccessibleVisited()
          mobile.set('zones')
          emit('done', 'newZone')
        },
      },
    ],
  },
]
</script>

<template>
  <DialogBox
    :character="profMerdant"
    :avatar-url="`/characters/${profMerdant.id}/${profMerdant.id}.png`"
    :dialog-tree="dialogTree"
    orientation="col"
  />
</template>
