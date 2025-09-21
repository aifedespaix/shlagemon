<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { storeToRefs } from 'pinia'
import { profMerdant } from '~/data/characters/prof-merdant'
import { allShlagemons } from '~/data/shlagemons'
import artichaud from '~/data/shlagemons/artichaud'
import electhordu from '~/data/shlagemons/electhordu'
import mairiousse from '~/data/shlagemons/mairiousse'
import mewteub from '~/data/shlagemons/mewteub'
import sulfusouris from '~/data/shlagemons/sulfusouris'
import zebrapoisbleu from '~/data/shlagemons/zebrapoisbleu'
import { createLaboratoryScene } from '~/modules/three/laboratoryScene'
import { createDexShlagemon } from '~/utils/dexFactory'
import { recallFinaleHp, resetFinaleHpMemory, storeFinaleHp } from '~/utils/finaleHpMemory'

interface HudHandle {
  updateAim: (position: { x: number, y: number }) => void
}

const laboratory = useLaboratoryStore()
const audio = useAudioStore()
const game = useGameStore()
const dex = useShlagedexStore()
const wildLevel = useWildLevelStore()
const { unlocked } = storeToRefs(laboratory)
const researchPointReward = laboratory.researchPointReward
const {
  capturedBaseIds,
  shlagemons: ownedShlagemons,
  activeShlagemon: activeDexShlagemon,
} = storeToRefs(dex)
const developer = useDeveloperStore()
const { debug } = storeToRefs(developer)
const { t } = useI18n()

const hasCompletedDex = computed(() => capturedBaseIds.value.size >= allShlagemons.length)

const defaultMusic = '/audio/musics/laboratory/space.ogg'
const battleMusic = '/audio/musics/laboratory/battle.ogg'

const isUnlocked = computed(() => unlocked.value)
const rendererHost = ref<HTMLElement | null>(null)
const hasStarted = ref(false)
const hudRef = shallowRef<HudHandle | null>(null)
let sceneHandle: ReturnType<typeof createLaboratoryScene> | null = null
let sceneCleanup: (() => void) | null = null

const legendaryState = ref<'idle' | 'intro' | 'battle' | 'victory' | 'defeat' | 'capture'>('idle')
const legendaryEnemy = ref<DexShlagemon | null>(null)
const legendaryBase = ref<BaseShlagemon | null>(null)
const legendaryLevel = ref(150)

const finaleState = ref<'idle' | 'intro' | 'battle' | 'victory' | 'defeat'>('idle')
const finaleTeam = ref<BaseShlagemon[]>([])
const finaleEnemy = ref<DexShlagemon | null>(null)
const finaleEnemyIndex = ref(0)
const finaleSessionTriggered = ref(false)
const finaleHpMemory = reactive<Record<string, number>>({})
const shouldLaunchFinale = ref(false)
const finaleDamageMultiplier = 123
const finaleEnemyLevel = 200
const finaleEnemyRarity = 666

const isLegendaryActive = computed(() => legendaryState.value !== 'idle')
const isBattleActive = computed(() => legendaryState.value === 'battle' && !!legendaryEnemy.value)
const isFinaleActive = computed(() => finaleState.value !== 'idle')

const shouldShowIntro = computed(() => isUnlocked.value && !hasStarted.value)
const isInteractive = computed(() => isUnlocked.value && hasStarted.value && !shouldShowIntro.value && !isLegendaryActive.value && !isFinaleActive.value)

const activePlayer = computed(() => activeDexShlagemon.value ?? ownedShlagemons.value[0] ?? null)

// Préparation éventuelle pour un switch en finale (features branch)
const _showFinaleSwitchModal = ref(false)
const _finaleSwitchCandidates = computed(() => {
  if (finaleState.value !== 'battle')
    return []
  const currentId = activePlayer.value?.id
  return dex.shlagemons.filter((mon) => {
    if (mon.id === currentId)
      return false
    if (mon.busy)
      return false
    const stored = finaleHpMemory[mon.id]
    const hp = stored ?? dex.maxHp(mon)
    return hp > 0
  })
})
const _canSwitchFinale = computed(() => finaleState.value === 'battle' && _finaleSwitchCandidates.value.length > 0)
const _finaleSwitchDisabledIds = computed(() => {
  if (finaleState.value !== 'battle')
    return dex.shlagemons.map(mon => mon.id)
  const currentId = activePlayer.value?.id
  const disabled: string[] = []
  for (const mon of dex.shlagemons) {
    if (mon.id === currentId || mon.busy) {
      disabled.push(mon.id)
      continue
    }
    const stored = finaleHpMemory[mon.id]
    const hp = stored ?? dex.maxHp(mon)
    if (hp <= 0)
      disabled.push(mon.id)
  }
  return disabled
})

const _finaleSelectedIds = computed(() =>
  activeDexShlagemon.value ? [activeDexShlagemon.value.id] : [],
)

// Depuis main
const isLegendaryBase = computed(() => legendaryBase.value?.speciality === 'legendary')

const legendaryBaseName = computed(() => legendaryBase.value ? t(legendaryBase.value.name) : '')
const legendaryBattleTitle = computed(() => t(
  isLegendaryBase.value
    ? 'components.panel.Laboratory.legendaryBattle.title'
    : 'components.panel.Laboratory.legendaryBattle.eliteTitle',
))

function legendaryDialogKey(
  section: 'intro' | 'victory' | 'defeat' | 'capture',
  field: 'text' | 'hunt' | 'continue',
): string {
  if (isLegendaryBase.value)
    return `components.panel.Laboratory.legendaryDialog.${section}.${field}`
  return `components.panel.Laboratory.legendaryDialog.post.${section}.${field}`
}

const dialogTree = computed<DialogNode[]>(() => {
  if (laboratory.finaleUnlocked && finaleState.value === 'idle' && !finaleSessionTriggered.value) {
    return [
      {
        id: 'intro',
        text: t('components.panel.Laboratory.introDialog.finalChoice'),
        responses: [
          {
            label: t('components.panel.Laboratory.introDialog.fight'),
            type: 'primary',
            action: () => {
              shouldLaunchFinale.value = true
              hasStarted.value = true
            },
          },
          {
            label: t('components.panel.Laboratory.introDialog.research'),
            type: 'default',
            action: () => {
              shouldLaunchFinale.value = false
              hasStarted.value = true
            },
          },
        ],
      },
    ]
  }

  return [
    {
      id: 'intro',
      text: t('components.panel.Laboratory.introDialog.text'),
      responses: [
        {
          label: t('components.panel.Laboratory.introDialog.embark'),
          type: 'primary',
          action: () => {
            shouldLaunchFinale.value = false
            hasStarted.value = true
          },
        },
      ],
    },
  ]
})

const legendaryDialogTree = computed<DialogNode[] | null>(() => {
  if (isFinaleActive.value)
    return null
  if (!legendaryBase.value)
    return null
  if (legendaryState.value === 'intro') {
    return [
      {
        id: 'legendary-intro',
        text: t(legendaryDialogKey('intro', 'text'), { name: legendaryBaseName.value }),
        responses: [
          {
            label: t(legendaryDialogKey('intro', 'hunt')),
            type: 'primary',
            action: startLegendaryBattle,
          },
        ],
      },
    ]
  }
  if (legendaryState.value === 'victory') {
    return [
      {
        id: 'legendary-victory',
        text: t(legendaryDialogKey('victory', 'text'), { name: legendaryBaseName.value }),
        responses: [
          {
            label: t(legendaryDialogKey('victory', 'continue')),
            type: 'primary',
            action: finishLegendaryEncounter,
          },
        ],
      },
    ]
  }
  if (legendaryState.value === 'defeat') {
    return [
      {
        id: 'legendary-defeat',
        text: t(legendaryDialogKey('defeat', 'text'), { name: legendaryBaseName.value }),
        responses: [
          {
            label: t(legendaryDialogKey('defeat', 'continue')),
            type: 'primary',
            action: finishLegendaryEncounter,
          },
        ],
      },
    ]
  }
  if (legendaryState.value === 'capture') {
    return [
      {
        id: 'legendary-capture',
        text: t(legendaryDialogKey('capture', 'text'), { name: legendaryBaseName.value }),
        responses: [
          {
            label: t(legendaryDialogKey('capture', 'continue')),
            type: 'primary',
            action: finishLegendaryEncounter,
          },
        ],
      },
    ]
  }
  return null
})

const finaleDialogTree = computed<DialogNode[] | null>(() => {
  if (finaleState.value === 'intro') {
    return [
      {
        id: 'finale-intro-1',
        text: t('components.panel.Laboratory.finaleDialog.intro.step1'),
        responses: [
          { label: t('components.panel.Laboratory.finaleDialog.intro.next'), nextId: 'finale-intro-2', type: 'primary' },
        ],
      },
      {
        id: 'finale-intro-2',
        text: t('components.panel.Laboratory.finaleDialog.intro.step2'),
        responses: [
          { label: t('components.panel.Laboratory.finaleDialog.intro.next'), nextId: 'finale-intro-3', type: 'primary' },
        ],
      },
      {
        id: 'finale-intro-3',
        text: t('components.panel.Laboratory.finaleDialog.intro.step3'),
        responses: [
          {
            label: t('components.panel.Laboratory.finaleDialog.intro.start'),
            type: 'valid',
            action: startFinaleBattle,
          },
        ],
      },
    ]
  }
  if (finaleState.value === 'victory') {
    return [
      {
        id: 'finale-victory-1',
        text: t('components.panel.Laboratory.finaleDialog.victory.step1'),
        responses: [
          { label: t('components.panel.Laboratory.finaleDialog.victory.next'), nextId: 'finale-victory-2', type: 'primary' },
        ],
      },
      {
        id: 'finale-victory-2',
        text: t('components.panel.Laboratory.finaleDialog.victory.step2'),
        responses: [
          { label: t('components.panel.Laboratory.finaleDialog.victory.next'), nextId: 'finale-victory-3', type: 'primary' },
        ],
      },
      {
        id: 'finale-victory-3',
        text: t('components.panel.Laboratory.finaleDialog.victory.step3'),
        responses: [
          {
            label: t('components.panel.Laboratory.finaleDialog.victory.end'),
            type: 'valid',
            action: finishFinaleEncounter,
          },
        ],
      },
    ]
  }
  if (finaleState.value === 'defeat') {
    return [
      {
        id: 'finale-defeat-1',
        text: t('components.panel.Laboratory.finaleDialog.defeat.step1'),
        responses: [
          { label: t('components.panel.Laboratory.finaleDialog.defeat.next'), nextId: 'finale-defeat-2', type: 'primary' },
        ],
      },
      {
        id: 'finale-defeat-2',
        text: t('components.panel.Laboratory.finaleDialog.defeat.step2'),
        responses: [
          {
            label: t('components.panel.Laboratory.finaleDialog.defeat.retry'),
            type: 'valid',
            action: finishFinaleEncounter,
          },
        ],
      },
    ]
  }
  return null
})

function openFinaleSwitchModal() {
  if (!_canSwitchFinale.value)
    return
  _showFinaleSwitchModal.value = true
}

/**
 * Apply finale battle switching rules when the player selects a new companion.
 */
function handleFinaleSwitchSelect(mon: DexShlagemon) {
  if (finaleState.value !== 'battle')
    return
  const current = activeDexShlagemon.value
  if (current?.id === mon.id)
    return
  const stored = finaleHpMemory[mon.id]
  if (stored !== undefined && stored <= 0)
    return
  if (current)
    storeFinaleHp(finaleHpMemory, current, dex.maxHp(current))
  dex.setActiveShlagemon(mon)
  const nextHp = recallFinaleHp(finaleHpMemory, mon, dex.maxHp(mon))
  if (nextHp <= 0) {
    if (current)
      dex.setActiveShlagemon(current)
    return
  }
  mon.hpCurrent = nextHp
}

function randomPitch(base = 1, variation = 0.05) {
  return base + (Math.random() * 2 - 1) * variation
}

function mountScene() {
  if (!rendererHost.value || sceneCleanup || !hasStarted.value)
    return
  const handle = createLaboratoryScene(rendererHost.value)
  sceneHandle = handle
  sceneCleanup = () => {
    handle.cleanup()
    sceneHandle = null
  }
}

function disposeScene() {
  if (!sceneCleanup)
    return
  sceneCleanup()
  sceneCleanup = null
}

watch([isUnlocked, hasStarted], ([unlockedState, started]) => {
  if (unlockedState && started)
    nextTick(mountScene)
  else
    disposeScene()
})

watch([hasStarted, () => laboratory.finaleUnlocked, shouldLaunchFinale], ([started, finale, launch]) => {
  if (started && finale && launch && !finaleSessionTriggered.value) {
    finaleSessionTriggered.value = true
    beginFinaleEncounter()
    shouldLaunchFinale.value = false
  }
})

watch(() => rendererHost.value, () => {
  if (!isUnlocked.value || !hasStarted.value)
    return
  disposeScene()
  nextTick(mountScene)
})

watch(shouldShowIntro, (value) => {
  if (value)
    resetAim()
})

watch(hasStarted, (value) => {
  if (value) {
    resetAim()
  }
  else {
    finaleSessionTriggered.value = false
    shouldLaunchFinale.value = false
  }
})

watch(() => legendaryState.value, (state) => {
  if (state !== 'idle')
    resetAim()
})

watch(() => finaleState.value, (state) => {
  if (state !== 'idle')
    resetAim()
})

onUnmounted(() => {
  disposeScene()
  audio.fadeToMusic(defaultMusic)
  finaleSessionTriggered.value = false
})

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function updatePointerAim(event: PointerEvent) {
  if (!rendererHost.value)
    return
  const rect = rendererHost.value.getBoundingClientRect()
  const x = clampValue(((event.clientX - rect.left) / rect.width) * 100, 6, 94)
  const y = clampValue(((event.clientY - rect.top) / rect.height) * 100, 10, 90)
  hudRef.value?.updateAim({ x, y })
}

function resetAim() {
  hudRef.value?.updateAim({ x: 50, y: 80 })
}

function onPointerMove(event: PointerEvent) {
  if (!isInteractive.value)
    return
  updatePointerAim(event)
}

function onPointerLeave(event?: PointerEvent) {
  if (!event || event.pointerType !== 'touch')
    resetAim()
}

function onPointerDown(event: PointerEvent) {
  if (!isInteractive.value || !sceneHandle || !rendererHost.value)
    return

  const rect = rendererHost.value.getBoundingClientRect()
  const ndcX = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const ndcY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
  updatePointerAim(event)
  audio.playSfx('laboratory-laser', { rate: randomPitch(1, 0.05) })
  const result = sceneHandle.shoot(ndcX, ndcY)
  if (result) {
    const reward = laboratory.calculateShlagpurReward(result.rewardMultiplier)
    game.addShlagpur(reward)
    audio.playSfx('laboratory-explose-a', { rate: randomPitch(1, 0.08) })
    const isTaurus = result.type === 'relic'
    const { reachedThreshold } = applyResearchProgress(1)
    laboratory.registerHit(isTaurus)
    if (isTaurus && reachedThreshold && legendaryState.value === 'idle') {
      laboratory.recordLegendaryEncounter()
      laboratory.consumeResearchCharge()
      beginLegendaryEncounter()
    }
  }
}

const RESEARCH_INTERVAL_MS = 10_000

function applyResearchProgress(points: number) {
  const result = laboratory.addResearchProgress(points)
  if (result.added > 0)
    game.addShlagpur(researchPointReward * result.added)
  return result
}

const { pause: pauseResearchTimer, resume: resumeResearchTimer } = useIntervalFn(() => {
  if (!isInteractive.value)
    return
  applyResearchProgress(1)
}, RESEARCH_INTERVAL_MS, { immediate: false, immediateCallback: false })

watch(isInteractive, (value) => {
  if (value)
    resumeResearchTimer()
  else
    pauseResearchTimer()
}, { immediate: true })

const LEGENDARY_SEQUENCE: Array<{ id: string, level: number }> = [
  { id: artichaud.id, level: 125 },
  { id: electhordu.id, level: 125 },
  { id: sulfusouris.id, level: 125 },
  { id: mewteub.id, level: 150 },
  { id: zebrapoisbleu.id, level: 175 },
  { id: mairiousse.id, level: 200 },
]

const legendaryBaseMap = Object.fromEntries(allShlagemons.map(base => [base.id, base])) as Record<string, BaseShlagemon>

/**
 * Pool of Shlagémon available for repeat research encounters once the Shlagédex is complete.
 * Every specimen, including legendaries, must remain available to match player expectations.
 */
function buildResearchEncounterPool(): readonly BaseShlagemon[] {
  return allShlagemons
}

/**
 * Finale battles deliberately exclude legendaries to preserve the curated difficulty ramp.
 */
function buildFinaleEncounterPool(): readonly BaseShlagemon[] {
  return allShlagemons.filter(base => base.speciality !== 'legendary')
}

function beginLegendaryEncounter() {
  if (isFinaleActive.value) {
    if (debug.value)
      console.warn('[Laboratory] Legendary encounter skipped: finale active')
    return
  }
  const encounter = selectLegendaryEncounter()
  if (!encounter) {
    if (debug.value)
      console.warn('[Laboratory] Legendary encounter skipped: no encounter available')
    return
  }
  legendaryBase.value = encounter.base
  legendaryLevel.value = encounter.level
  legendaryEnemy.value = null
  legendaryState.value = 'intro'
  if (debug.value)
    console.warn('[Laboratory] Legendary encounter ready', { baseId: encounter.base.id, level: encounter.level })
  audio.fadeToMusic(battleMusic)
  resetAim()
}

function finishLegendaryEncounter() {
  legendaryState.value = 'idle'
  legendaryEnemy.value = null
  legendaryBase.value = null
  legendaryLevel.value = 150
  audio.fadeToMusic(defaultMusic)
  resetAim()
  laboratory.setLegendaryBattleActive(false)
}

function selectLegendaryEncounter(): { base: BaseShlagemon, level: number } | null {
  if (hasCompletedDex.value)
    return selectEliteEncounter()
  const captured = capturedBaseIds.value
  for (const entry of LEGENDARY_SEQUENCE) {
    if (captured.has(entry.id))
      continue
    const base = legendaryBaseMap[entry.id]
    if (base)
      return { base, level: entry.level }
  }
  return null
}

function selectEliteEncounter(): { base: BaseShlagemon, level: number } | null {
  const pool = buildResearchEncounterPool()
  if (!pool.length)
    return null
  const base = pool[Math.floor(Math.random() * pool.length)]
  return { base, level: 200 }
}

function generateFinaleTeam(): BaseShlagemon[] {
  const pool = buildFinaleEncounterPool()
  if (pool.length <= 6)
    return pool.slice(0, 6)
  const selection: BaseShlagemon[] = []
  const used = new Set<string>()
  while (selection.length < 6 && used.size < pool.length) {
    const pick = pool[Math.floor(Math.random() * pool.length)]
    if (used.has(pick.id))
      continue
    used.add(pick.id)
    selection.push(pick)
  }
  return selection
}

/**
 * Create the enemy instance for Professor Merdant's finale battle.
 * Ensures every Shlagémon has the intended level and the 666 rarity requirement.
 */
function createFinaleEnemy(base: BaseShlagemon): DexShlagemon {
  const enemy = createDexShlagemon(base, false, finaleEnemyLevel, finaleEnemyRarity, finaleEnemyRarity)
  enemy.hpCurrent = enemy.hp
  return enemy
}

function resetFinaleBattle() {
  finaleEnemy.value = null
  finaleEnemyIndex.value = 0
  finaleTeam.value = []
  resetFinaleHpMemory(finaleHpMemory)
}

function beginFinaleEncounter() {
  resetFinaleBattle()
  finaleTeam.value = generateFinaleTeam()
  finaleState.value = 'intro'
  resetAim()
}

function startFinaleBattle() {
  ensureActiveShlagemon()
  const player = activePlayer.value
  if (!player || !finaleTeam.value.length) {
    finishFinaleEncounter()
    return
  }
  resetFinaleHpMemory(finaleHpMemory)
  player.hpCurrent = dex.maxHp(player)
  const base = finaleTeam.value[finaleEnemyIndex.value]
  if (!base) {
    finishFinaleEncounter()
    return
  }
  finaleEnemy.value = createFinaleEnemy(base)
  finaleState.value = 'battle'
  audio.fadeToMusic(battleMusic)
}

function advanceFinaleEnemy() {
  finaleEnemyIndex.value += 1
  if (finaleEnemyIndex.value >= finaleTeam.value.length) {
    finaleState.value = 'victory'
    finaleEnemy.value = null
    audio.fadeToMusic(defaultMusic)
    resetFinaleHpMemory(finaleHpMemory)
    return
  }
  const nextBase = finaleTeam.value[finaleEnemyIndex.value]
  if (!nextBase) {
    finishFinaleEncounter()
    return
  }
  finaleEnemy.value = createFinaleEnemy(nextBase)
}

function onFinaleBattleEnd(result: 'win' | 'lose' | 'draw') {
  if (result === 'win') {
    advanceFinaleEnemy()
    return
  }
  finaleState.value = 'defeat'
  finaleEnemy.value = null
  audio.fadeToMusic(defaultMusic)
  resetFinaleHpMemory(finaleHpMemory)
}

function finishFinaleEncounter() {
  finaleState.value = 'idle'
  resetFinaleBattle()
  audio.fadeToMusic(defaultMusic)
  resetAim()
}

function ensureActiveShlagemon() {
  if (!dex.activeShlagemon && dex.shlagemons.length)
    dex.setActiveShlagemon(dex.shlagemons[0])
}

function startLegendaryBattle() {
  if (isFinaleActive.value)
    return
  ensureActiveShlagemon()
  const player = activePlayer.value
  if (!player || !legendaryBase.value) {
    finishLegendaryEncounter()
    return
  }
  player.hpCurrent = dex.maxHp(player)
  const enemy = createDexShlagemon(legendaryBase.value, false, legendaryLevel.value, wildLevel.highestWildLevel)
  if (isLegendaryBase.value)
    enemy.rarity = Math.max(enemy.rarity, 100)
  enemy.hpCurrent = enemy.hp
  enemy.captureProfile = 'legendary'
  legendaryEnemy.value = enemy
  legendaryState.value = 'battle'
  laboratory.setLegendaryBattleActive(true)
}

function onLegendaryBattleEnd(result: 'win' | 'lose' | 'draw') {
  if (result === 'win')
    legendaryState.value = 'victory'
  else
    legendaryState.value = 'defeat'
  legendaryEnemy.value = null
  laboratory.setLegendaryBattleActive(false)
}

function onLegendaryCapture() {
  legendaryState.value = 'capture'
  legendaryEnemy.value = null
  laboratory.setLegendaryBattleActive(false)
}
</script>

<template>
  <LayoutTitledPanel
    title=""
    exit-text=""
    :show-footer="false"
  >
    <div
      class="relative h-full flex flex-1 overflow-hidden"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
    >
      <template v-if="isUnlocked">
        <div
          v-if="finaleDialogTree"
          class="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/85 p-4"
        >
          <DialogBox
            :character="profMerdant"
            :dialog-tree="finaleDialogTree"
            :play-character-track="false"
            :keep-music-on-exit="true"
          />
        </div>

        <div
          v-if="finaleState === 'battle' && finaleEnemy && activePlayer"
          class="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
        >
          <div class="relative h-full max-w-5xl w-full flex flex-col justify-center">
            <BattleRound
              :player="activePlayer"
              :enemy="finaleEnemy"
              :capture-enabled="false"
              :force-show-owned-ball="true"
              :damage-multiplier="finaleDamageMultiplier"
              @end="onFinaleBattleEnd"
            >
              <template #header>
                <div class="flex flex-col items-center justify-center gap-1 pb-2 text-center text-slate-100">
                  <span class="text-xl font-bold tracking-[0.3em] uppercase">
                    {{ t('components.panel.Laboratory.finaleBattle.title') }}
                  </span>
                  <span class="text-xs text-slate-300/80">{{ t('components.panel.Laboratory.finaleBattle.progress', { current: finaleEnemyIndex + 1, total: finaleTeam.length || 6 }) }}</span>
                </div>
              </template>
              <template #default>
                <div class="mt-3 flex justify-center">
                  <UiButton
                    size="sm"
                    type="default"
                    variant="outline"
                    :disabled="!_canSwitchFinale"
                    @click="openFinaleSwitchModal"
                  >
                    {{ t('components.panel.Laboratory.finaleBattle.switch') }}
                  </UiButton>
                </div>
              </template>
            </BattleRound>
            <ShlagemonSelectModal
              v-model="_showFinaleSwitchModal"
              :title="t('components.panel.Laboratory.finaleBattle.selectTitle')"
              :selected-ids="_finaleSelectedIds"
              :disabled-ids="_finaleSwitchDisabledIds"
              :locked="!_canSwitchFinale"
              :close-on-select="true"
              @select="handleFinaleSwitchSelect"
            />
          </div>
        </div>

        <div
          v-if="shouldShowIntro"
          class="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/80 p-4"
        >
          <DialogBox
            :character="profMerdant"
            :dialog-tree="dialogTree"
            :play-character-track="false"
            :keep-music-on-exit="true"
          />
        </div>

        <div
          v-if="legendaryDialogTree"
          class="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/80 p-4"
        >
          <DialogBox
            :character="profMerdant"
            :dialog-tree="legendaryDialogTree"
            :play-character-track="false"
            :keep-music-on-exit="true"
          />
        </div>

        <div
          v-if="isBattleActive && legendaryEnemy && activePlayer"
          class="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/85 p-4"
        >
          <div class="relative h-full max-w-5xl w-full flex flex-col justify-center">
            <BattleRound
              :player="activePlayer"
              :enemy="legendaryEnemy"
              :force-show-owned-ball="true"
              @end="onLegendaryBattleEnd"
              @capture="onLegendaryCapture"
            >
              <template #header>
                <div class="flex flex-col items-center justify-center gap-1 pb-2 text-center text-slate-100">
                  <span class="text-xs text-slate-200/80 tracking-[0.2em] uppercase">
                    {{ legendaryBattleTitle }}
                  </span>
                  <span class="text-lg font-semibold">{{ legendaryBaseName }}</span>
                </div>
              </template>
            </BattleRound>
          </div>
        </div>

        <div
          v-if="legendaryState === 'battle' && (!legendaryEnemy || !activePlayer)"
          class="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/85 p-4"
        >
          <UiInfo color="alert" class="max-w-md text-center">
            {{ t('components.panel.Laboratory.legendaryBattle.missingTeam') }}
          </UiInfo>
        </div>

        <div
          v-if="hasStarted"
          ref="rendererHost"
          class="absolute inset-0"
        />

        <LaboratoryHud
          v-if="isInteractive"
          ref="hudRef"
          class="absolute inset-0 z-10"
        />
      </template>

      <div
        v-else
        class="relative z-10 h-full w-full flex items-center justify-center p-4"
      >
        <UiInfo color="alert" class="max-w-md">
          {{ t('components.panel.Laboratory.locked') }}
        </UiInfo>
      </div>
    </div>
  </LayoutTitledPanel>
</template>
