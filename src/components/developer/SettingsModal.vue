<script setup lang="ts">
import { getArena } from '~/data/arenas'
import { allShlagemons } from '~/data/shlagemons'
import { applyCurrentStats, applyStats, xpForLevel } from '~/utils/dexFactory'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const show = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

const dev = useDeveloperStore()
const game = useGameStore()
const dex = useShlagedexStore()
const player = usePlayerStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()

function addMoney() {
  game.addShlagidolar(100000)
}

function addDiamonds() {
  game.addShlagidiamond(1000)
}

function resetMoney() {
  game.reset()
}

function setRarity(value: number) {
  if (!dex.activeShlagemon)
    return
  dex.activeShlagemon.rarity = value
  applyStats(dex.activeShlagemon)
  applyCurrentStats(dex.activeShlagemon)
  dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
}

function captureRandom() {
  const captured = new Set(dex.shlagemons.map(m => m.base.id))
  const available = allShlagemons.filter(b => !captured.has(b.id))
  if (!available.length)
    return
  const base = available[Math.floor(Math.random() * available.length)]
  dex.captureShlagemon(base)
}

function boostStats() {
  const mon = dex.activeShlagemon
  if (!mon)
    return
  mon.baseStats.hp += 100
  mon.baseStats.attack += 10
  mon.baseStats.defense += 10
  mon.baseStats.smelling += 10
  mon.hp += 100
  mon.attack += 10
  mon.defense += 10
  mon.smelling += 10
  mon.hpCurrent = mon.hp
}

function resetStats() {
  const mon = dex.activeShlagemon
  if (!mon)
    return
  applyStats(mon)
  applyCurrentStats(mon)
  mon.hpCurrent = mon.hp
}

function levelUp10() {
  const mon = dex.activeShlagemon
  if (!mon)
    return
  dex.gainXp(mon, xpForLevel(mon.lvl) * 10)
}

function resetLevel() {
  const mon = dex.activeShlagemon
  if (!mon)
    return
  mon.lvl = 1
  mon.xp = 0
  applyCurrentStats(mon)
  mon.hpCurrent = mon.hp
}

function completeArena(id: string) {
  const arena = getArena(id)
  if (!arena)
    return
  player.earnBadge(arena.id)
  progress.completeArena(id)
  zone.completeArena(id)
}

function resetArenas() {
  player.reset()
  progress.reset()
  zone.zones.forEach((z) => {
    if (z.arena)
      z.arena.completed = false
  })
}
</script>

<template>
  <UiModal v-model="show" footer-close>
    <h3 class="mb-2 text-center text-lg font-bold">
      Paramètres développeur
    </h3>
    <UiCheckBox v-model="dev.debug" class="flex items-center justify-between">
      <span>Mode debug</span>
    </UiCheckBox>
    <div class="mt-4 flex flex-col gap-2">
      <UiButton @click="addMoney">
        +100000 Shlagédolar
      </UiButton>
      <UiButton @click="addDiamonds">
        +1000 Shlagédiamant
      </UiButton>
      <UiButton type="danger" variant="outline" @click="resetMoney">
        Réinitialiser l'argent
      </UiButton>

      <UiButton :disabled="!dex.activeShlagemon" @click="setRarity(99)">
        Rareté 99
      </UiButton>
      <UiButton :disabled="!dex.activeShlagemon" @click="setRarity(100)">
        Rareté 100
      </UiButton>
      <UiButton type="danger" variant="outline" :disabled="!dex.activeShlagemon" @click="setRarity(1)">
        Reset Rareté
      </UiButton>

      <UiButton @click="captureRandom">
        Capturer un nouveau Shlagémon
      </UiButton>
      <UiButton :disabled="!dex.activeShlagemon" @click="boostStats">
        Booster stats
      </UiButton>
      <UiButton type="danger" variant="outline" :disabled="!dex.activeShlagemon" @click="resetStats">
        Reset stats
      </UiButton>
      <UiButton :disabled="!dex.activeShlagemon" @click="levelUp10">
        +10 niveaux
      </UiButton>
      <UiButton type="danger" variant="outline" :disabled="!dex.activeShlagemon" @click="resetLevel">
        Reset niveau
      </UiButton>

      <UiButton @click="completeArena('village-boule')">
        Valider arène 1
      </UiButton>
      <UiButton @click="completeArena('village-paume')">
        Valider arène 2
      </UiButton>
      <UiButton @click="completeArena('village-cassos-land')">
        Valider arène 3
      </UiButton>
      <UiButton type="danger" variant="outline" @click="resetArenas">
        Reset arènes
      </UiButton>
    </div>
  </UiModal>
</template>
