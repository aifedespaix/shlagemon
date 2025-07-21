<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Félicitations ! Tes victoires ont débloqué l\'accès au combat contre le roi ou la reine de cette zone.',
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: 'Pour progresser, tu devras vaincre ce Roi ou cette Reine redoutable. Mais attention, ce bal-trou à tellement spam la zone qu\'il est devenu grave fort !',
    responses: [
      { label: 'Retour', nextId: 'start', type: 'danger' },
      { label: 'Continuer', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Dans un combat contre dresseur, tu n\'as pas le droit de changer de Shlagémon ! De plus, tu ne peux pas utiliser de potion de soin, seuls les effets passifs de certaines potions ont un impact sur le combat.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Continuer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Je t\'offre une Potion de Défense. Elle s\'utilise dans ton inventaire et booste toute ton équipe.',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      { label: 'Continuer', nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: 'Attention, son effet dure 10 minutes et ne fonctionne qu\'une seule fois, quel que soit ton Shlagémon actif.',
    responses: [
      { label: 'Retour', nextId: 'step4', type: 'danger' },
      { label: 'Continuer', nextId: 'step6', type: 'primary' },
    ],
  },
  {
    id: 'step6',
    text: 'Bonne chance pour le combat contre les différent(e)s reines et rois !',
    responses: [
      { label: 'Retour', nextId: 'step5', type: 'danger' },
      {
        label: 'Merci Prof !',
        type: 'valid',
        action: () => {
          inventory.add('defense-potion', 1)
          emit('done', 'kingUnlock')
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
