<script setup lang="ts">
import type { DexShlagemon } from '~/type'
import type { DialogNode } from '~/type/dialog'
import { allShlagemons } from '~/data/shlagemons'
import { useKingPotionStore } from '~/stores/kingPotion'
import { useWildLevelStore } from '~/stores/wildLevel'
import { createDexShlagemon } from '~/utils/dexFactory'
import DialogBox from '../dialog/Box.vue'
import KingPotionButton from './KingPotionButton.vue'

const dex = useShlagedexStore()
const trainerStore = useTrainerBattleStore()
const battleStats = useBattleStatsStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()
const panel = useMainPanelStore()
const featureLock = useFeatureLockStore()
const game = useGameStore()
const mobile = useMobileTabStore()
const wildLevel = useWildLevelStore()
const kingPotion = useKingPotionStore()
const { t } = useI18n()

const trainer = computed(() => trainerStore.current)
const isZoneKing = computed(() => trainer.value?.id.startsWith('king-'))
const kingLabel = computed(() =>
  trainer.value?.character.gender === 'female'
    ? t('components.battle.Trainer.queen')
    : t('components.battle.Trainer.king'),
)

const stage = ref<'before' | 'battle' | 'after'>('before')
const result = ref<'none' | 'win' | 'lose'>('none')
const enemyIndex = ref(0)
const enemy = ref(null as DexShlagemon | null)

const beforeDialogTree = computed<DialogNode[]>(() => {
  if (!trainer.value)
    return []
  return [
    {
      id: 'start',
      text: t(trainer.value.dialogBefore),
      responses: [
        { label: t('components.battle.Trainer.startBattle'), type: 'primary', action: startFight },
        { label: t('components.battle.Trainer.quit'), type: 'danger', action: cancelFight },
      ],
    },
  ]
})

const afterDialogTree = computed<DialogNode[]>(() => {
  if (!trainer.value)
    return []
  if (result.value === 'win') {
    return [
      {
        id: 'start',
        text: t(trainer.value.dialogAfter),
        responses: [
          { label: t('components.battle.Trainer.continue'), nextId: 'reward', type: 'primary' },
        ],
      },
      {
        id: 'reward',
        text: t('components.battle.Trainer.reward', { amount: trainer.value.reward }),
        responses: [
          { label: t('components.battle.Trainer.continue'), type: 'valid', action: finish },
        ],
      },
    ]
  }
  else {
    const defeatText = trainer.value.dialogDefeat
      ? t(trainer.value.dialogDefeat)
      : t('components.battle.Trainer.defeat')
    if (isZoneKing.value) {
      return [
        {
          id: 'start',
          text: defeatText,
          responses: [
            { label: t('components.battle.Trainer.retry'), type: 'valid', action: startFight },
            { label: t('components.battle.Trainer.quit'), type: 'danger', action: cancelFight },
          ],
        },
      ]
    }
    return [
      {
        id: 'start',
        text: defeatText,
        responses: [
          { label: t('components.battle.Trainer.continue'), type: 'valid', action: finish },
        ],
      },
    ]
  }
})

function createEnemy(): DexShlagemon | null {
  const t = trainer.value
  if (!t || !dex.activeShlagemon)
    return null
  const spec = t.shlagemons[enemyIndex.value]
  if (!spec)
    return null
  const baseId = typeof spec === 'string' ? spec : spec.baseId
  const base = allShlagemons.find(b => b.id === baseId)
  if (!base)
    return null
  const max = wildLevel.highestWildLevel
  const min = isZoneKing.value ? Math.max(1, max - 20) : 1
  const zoneMax = zone.current.maxLevel ?? 1

  let level
  if (zoneMax === 99) {
    level = 99
  }
  else {
    level = typeof spec === 'string'
      ? zoneMax + 1 - (t.shlagemons.length - 1 - enemyIndex.value)
      : spec.level
  }
  return createDexShlagemon(base, false, level, max, min)
}

function startFight() {
  if (!trainer.value || !dex.activeShlagemon)
    return
  enemyIndex.value = 0
  if (dex.activeShlagemon.hpCurrent <= 0)
    dex.activeShlagemon.hpCurrent = dex.maxHp(dex.activeShlagemon)
  kingPotion.reset()
  result.value = 'none'
  stage.value = 'battle'
  enemy.value = createEnemy()
}

watch(trainer, (t) => {
  if (t) {
    stage.value = 'before'
    enemyIndex.value = 0
    result.value = 'none'
    kingPotion.reset()
  }
})

function nextBattle() {
  enemyIndex.value += 1
  if (enemyIndex.value < (trainer.value?.shlagemons.length || 0)) {
    enemy.value = createEnemy()
    return false
  }
  return true
}

async function onEnd(type: 'capture' | 'win' | 'lose' | 'draw') {
  const defeated = enemy.value
  enemy.value = null
  if (!defeated) {
    enemy.value = createEnemy()
    return
  }
  if (type === 'win') {
    if (dex.activeShlagemon) {
      const missing = dex.maxHp(dex.activeShlagemon) - dex.activeShlagemon.hpCurrent
      if (missing > 0) {
        const heal = Math.round(missing * trainerStore.winHealPercent / 100)
        dex.healActive(heal)
      }
    }
    const finished = nextBattle()
    if (finished) {
      if (trainer.value)
        progress.defeatKing(zone.current.id)
      result.value = 'win'
      stage.value = 'after'
      return
    }
  }
  else if (type === 'lose') {
    if (isZoneKing.value)
      battleStats.addKingLoss()
    else
      battleStats.addLoss()
    notifyAchievement({ type: 'battle-loss' })
    result.value = 'lose'
    stage.value = 'after'
    return
  }
  enemy.value = createEnemy()
}

function finish() {
  if (result.value === 'win') {
    if (trainer.value?.reward)
      game.addShlagidiamond(trainer.value.reward)
    if (trainer.value?.id.startsWith('king-')) {
      progress.defeatKing(zone.current.id)
      notifyAchievement({ type: 'king-defeated' })
    }
    trainerStore.next()
    zone.setZone(zone.current.id)
    panel.showBattle()
    if (trainer.value?.id.startsWith('king-'))
      mobile.set('zones')
  }
  else if (result.value === 'lose') {
    stage.value = 'before'
    enemyIndex.value = 0
    result.value = 'none'
  }
}

function cancelFight() {
  panel.showBattle()
}

onMounted(featureLock.lockAll)
onUnmounted(featureLock.unlockAll)
</script>

<template>
  <div class="relative w-full flex flex-col gap-1 overflow-auto p-1">
    <div v-if="stage === 'before'" class="h-full flex flex-col items-center gap-2 text-center">
      <template v-if="isZoneKing">
        <div class="font-bold capitalize">
          {{ t('components.battle.Trainer.zoneKingChallenge', { label: kingLabel }) }}
        </div>
      </template>
      <DialogBox
        :character="trainer.character"
        :dialog-tree="beforeDialogTree"
        :keep-music-on-exit="isZoneKing"
      />
    </div>
    <template v-else-if="stage === 'battle' && dex.activeShlagemon && enemy">
      <BattleRound

        :player="dex.activeShlagemon"
        :enemy="enemy"
        :capture-enabled="false"
        @end="onEnd"
      >
        <template #header>
          <BattleHeader :trainer="trainer" :defeated="enemyIndex" />
        </template>
      </BattleRound>
      <KingPotionButton v-if="isZoneKing && kingPotion.power" :enemy="enemy" />
    </template>

    <div v-else class="h-full flex flex-col items-center gap-2 text-center">
      <DialogBox
        :character="trainer.character"
        :dialog-tree="afterDialogTree"
        :keep-music-on-exit="isZoneKing"
      />
    </div>
  </div>
</template>
