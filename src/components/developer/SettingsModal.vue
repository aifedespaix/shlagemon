<script setup lang="ts">
import { arenaZoneIds, getArenaByZoneId } from '~/data/arenas'
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
const progress = useZoneProgressStore()
const badgeBox = useBadgeBoxStore()
const trainerBattle = useTrainerBattleStore()

const hasActiveMon = computed(() => Boolean(dex.activeShlagemon))

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

const arenaZoneLabels: Record<(typeof arenaZoneIds)[number], string> = {
  'village-boule': 'Arène Boule',
  'village-paume': 'Arène Paume',
  'village-cassos-land': 'Arène Cassos Land',
  'village-clitoland': 'Arène Clitoland',
}

function finishArena(zoneId: (typeof arenaZoneIds)[number]) {
  const arenaConfig = getArenaByZoneId(zoneId)
  if (!arenaConfig)
    return
  progress.completeArena(zoneId)
  player.earnBadge(arenaConfig.id)
  badgeBox.addBadge(arenaConfig.badge)
}

function resetArenas() {
  player.reset()
  progress.reset()
  badgeBox.reset()
}

function completeAllArenas() {
  arenaZoneIds.forEach(zoneId => finishArena(zoneId))
}

function completeAllTrainerBattles() {
  const rewarded = new Set<string>()
  let nextTrainer = trainerBattle.current
  while (nextTrainer) {
    if (!rewarded.has(nextTrainer.id) && nextTrainer.reward)
      game.addShlagidiamond(nextTrainer.reward)
    rewarded.add(nextTrainer.id)
    trainerBattle.next()
    nextTrainer = trainerBattle.current
  }
}

interface DevAction {
  key: string
  label: string
  icon?: string
  onClick: () => void
  type?: 'primary' | 'secondary' | 'danger' | 'info'
  variant?: 'outline' | 'ghost'
  disabled?: () => boolean
}

interface DevSection {
  key: string
  title: string
  icon: string
  actions: DevAction[]
}

const sections = computed<DevSection[]>(() => [
  {
    key: 'resources',
    title: 'Ressources',
    icon: 'i-carbon-currency-dollar',
    actions: [
      {
        key: 'add-money',
        label: '+100000 Shlagédolar',
        icon: 'i-carbon-currency-dollar',
        onClick: addMoney,
      },
      {
        key: 'add-diamonds',
        label: '+1000 Shlagédiamant',
        icon: 'i-carbon-diamond',
        onClick: addDiamonds,
      },
      {
        key: 'reset-money',
        label: 'Réinitialiser l\'argent',
        icon: 'i-carbon-renew',
        onClick: resetMoney,
        type: 'danger',
        variant: 'outline',
      },
    ],
  },
  {
    key: 'shlagemon',
    title: 'Shlagémon actif',
    icon: 'i-carbon-star',
    actions: [
      {
        key: 'capture-random',
        label: 'Capturer un nouveau Shlagémon',
        icon: 'i-carbon-add-alt',
        onClick: captureRandom,
      },
      {
        key: 'rarity-99',
        label: 'Rareté 99',
        icon: 'i-carbon-number-9',
        onClick: () => setRarity(99),
        disabled: () => !hasActiveMon.value,
      },
      {
        key: 'rarity-100',
        label: 'Rareté 100',
        icon: 'i-carbon-number-0',
        onClick: () => setRarity(100),
        disabled: () => !hasActiveMon.value,
      },
      {
        key: 'rarity-reset',
        label: 'Reset rareté',
        icon: 'i-carbon-reset',
        onClick: () => setRarity(1),
        type: 'danger',
        variant: 'outline',
        disabled: () => !hasActiveMon.value,
      },
      {
        key: 'boost-stats',
        label: 'Booster les stats',
        icon: 'i-carbon-analytics',
        onClick: boostStats,
        disabled: () => !hasActiveMon.value,
      },
      {
        key: 'reset-stats',
        label: 'Reset stats',
        icon: 'i-carbon-undo',
        onClick: resetStats,
        type: 'danger',
        variant: 'outline',
        disabled: () => !hasActiveMon.value,
      },
      {
        key: 'level-up',
        label: '+10 niveaux',
        icon: 'i-carbon-up-to-top',
        onClick: levelUp10,
        disabled: () => !hasActiveMon.value,
      },
      {
        key: 'reset-level',
        label: 'Reset niveau',
        icon: 'i-carbon-arrow-reset',
        onClick: resetLevel,
        type: 'danger',
        variant: 'outline',
        disabled: () => !hasActiveMon.value,
      },
    ],
  },
  {
    key: 'trainers',
    title: 'Combats de dresseurs',
    icon: 'i-carbon-user-multiple',
    actions: [
      {
        key: 'complete-trainers',
        label: 'Valider tous les combats de dresseurs',
        icon: 'i-carbon-checkmark',
        onClick: completeAllTrainerBattles,
      },
    ],
  },
  {
    key: 'arenas',
    title: 'Arènes',
    icon: 'i-carbon-trophy',
    actions: [
      ...arenaZoneIds.map<DevAction>(zoneId => ({
        key: `arena-${zoneId}`,
        label: `Valider ${arenaZoneLabels[zoneId]}`,
        icon: 'i-carbon-medal',
        onClick: () => finishArena(zoneId),
      })),
      {
        key: 'arenas-all',
        label: 'Valider toutes les arènes',
        icon: 'i-carbon-checkmark-multiple',
        onClick: completeAllArenas,
      },
      {
        key: 'arenas-reset',
        label: 'Reset arènes et badges',
        icon: 'i-carbon-trash-can',
        onClick: resetArenas,
        type: 'danger',
        variant: 'outline',
      },
    ],
  },
])
</script>

<template>
  <UiModal v-model="show" content-padding="none">
    <LayoutScrollablePanel>
      <template #header>
        <div>
          <h3 class="mb-2 p-2 text-center text-lg font-bold">
            Paramètres développeur
          </h3>
          <UiCheckBox v-model="dev.debug" class="flex items-center justify-between">
            <span>Mode debug</span>
          </UiCheckBox>
        </div>
      </template>

      <template #content>
        <div class="grid mt-4 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <section
            v-for="section in sections"
            :key="section.key"
            class="border border-gray-200/60 rounded-lg bg-white/70 p-3 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/40"
          >
            <header class="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide uppercase opacity-80">
              <div :class="section.icon" class="text-base" />
              <span>{{ section.title }}</span>
            </header>
            <div class="flex flex-col gap-2">
              <UiButton
                v-for="action in section.actions"
                :key="action.key"
                :type="action.type"
                :variant="action.variant"
                :disabled="action.disabled ? action.disabled() : false"
                class="flex items-center justify-center gap-2 text-sm"
                @click="action.onClick()"
              >
                <div v-if="action.icon" :class="action.icon" />
                <span>{{ action.label }}</span>
              </UiButton>
            </div>
          </section>
        </div>
      </template>
    </LayoutScrollablePanel>
  </UiModal>
</template>
