<script setup lang="ts">
import type { ShlagCard } from '~/type'
import { useElementSize } from '@vueuse/core'
import { allShlagemons } from '~/data/shlagemons'
import { shlagemonTypes } from '~/data/shlagemons-type'

const emit = defineEmits<{
  (e: 'gameEnd', winner: 'player' | 'opponent'): void
  (e: 'turnStart', player: 'player' | 'opponent'): void
  (e: 'win'): void
  (e: 'lose'): void
}>()

const effects = ['steal', 'nullify', 'x2', 'swap', 'chaos', 'mirror'] as const

type Effect = typeof effects[number]

interface PlayerState {
  hand: ShlagCard[]
  score: number
}

const player: PlayerState = reactive({ hand: [], score: 0 })
const opponent: PlayerState = reactive({ hand: [], score: 0 })

const selectedPlayer = ref<ShlagCard | null>(null)
const selectedOpponent = ref<ShlagCard | null>(null)
const hiddenPlayerCards = reactive(new Set<string>())
const hiddenOpponentCards = reactive(new Set<string>())
const roundWinner = ref<'player' | 'opponent' | 'draw' | null>(null)
const revealed = ref(false)
const history = ref<{ player: ShlagCard, opponent: ShlagCard, winner: string }[]>([])

const wrapper = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(wrapper)
const cardSize = computed(() => Math.min(width.value / 4, height.value / 6))

function randomCard(): ShlagCard {
  const base = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
  const effect = effects[Math.floor(Math.random() * effects.length)] as Effect
  return {
    id: `${Date.now()}-${Math.random()}`,
    name: base.name,
    type: base.types[0].id as ShlagCard['type'],
    power: Math.floor(Math.random() * 9) + 1,
    effect,
    image: `/shlagemons/${base.id}/${base.id}.png`,
  }
}

function isSuperEffective(att: ShlagCard['type'], def: ShlagCard['type']) {
  const defType = shlagemonTypes[def]
  return defType.weakness.some(w => w.id === att)
}

function reset() {
  player.hand = Array.from({ length: 3 }, randomCard)
  opponent.hand = Array.from({ length: 3 }, randomCard)
  player.score = 0
  opponent.score = 0
  selectedPlayer.value = null
  selectedOpponent.value = null
  hiddenPlayerCards.clear()
  hiddenOpponentCards.clear()
  revealed.value = false
  history.value = []
  emit('turnStart', 'player')
}

function play(card: ShlagCard) {
  if (revealed.value || selectedPlayer.value)
    return
  selectedPlayer.value = card
  hiddenPlayerCards.add(card.id)
  if (card.effect === 'swap') {
    const others = player.hand.filter(c => c !== card)
    if (others.length) {
      const idx = Math.floor(Math.random() * others.length)
      const replacement = others[idx]
      const rIdx = player.hand.indexOf(replacement)
      player.hand[rIdx] = card
      selectedPlayer.value = replacement
    }
  }
  aiSelect()
}

function aiSelect() {
  const idx = Math.floor(Math.random() * opponent.hand.length)
  let card = opponent.hand[idx]
  hiddenOpponentCards.add(card.id)
  if (card.effect === 'swap') {
    const others = opponent.hand.filter((_, i) => i !== idx)
    if (others.length) {
      const oIdx = Math.floor(Math.random() * others.length)
      const replacement = others[oIdx]
      const rIdx = opponent.hand.indexOf(replacement)
      opponent.hand[rIdx] = card
      card = replacement
    }
  }
  selectedOpponent.value = card
  emit('turnStart', 'opponent')
  useTimeoutFn(resolve, 800)
}

function afterEffects(a: ShlagCard, b: ShlagCard, pEffect: Effect | null, oEffect: Effect | null) {
  if (pEffect === 'steal' && opponent.hand.length)
    player.hand.push(opponent.hand.splice(Math.floor(Math.random() * opponent.hand.length), 1)[0])
  if (oEffect === 'steal' && player.hand.length)
    opponent.hand.push(player.hand.splice(Math.floor(Math.random() * player.hand.length), 1)[0])
  if (pEffect === 'chaos')
    player.hand.push(randomCard())
  if (oEffect === 'chaos')
    opponent.hand.push(randomCard())
}

function resolve() {
  if (!selectedPlayer.value || !selectedOpponent.value)
    return
  revealed.value = true
  const p = { ...selectedPlayer.value }
  const o = { ...selectedOpponent.value }
  let pEffect: Effect | null = p.effect
  let oEffect: Effect | null = o.effect
  if (pEffect === 'nullify')
    oEffect = null
  if (oEffect === 'nullify')
    pEffect = null
  if (pEffect === 'mirror') {
    p.type = o.type
    p.power = o.power
  }
  if (oEffect === 'mirror') {
    o.type = p.type
    o.power = p.power
  }
  if (pEffect === 'x2')
    p.power *= 2
  if (oEffect === 'x2')
    o.power *= 2

  let winner: 'player' | 'opponent' | 'draw'
  const pSuper = isSuperEffective(p.type, o.type)
  const oSuper = isSuperEffective(o.type, p.type)

  if (pSuper && !oSuper)
    winner = 'player'
  else if (oSuper && !pSuper)
    winner = 'opponent'
  else if (p.power === o.power)
    winner = 'draw'
  else winner = p.power > o.power ? 'player' : 'opponent'

  roundWinner.value = winner
  history.value.push({ player: p, opponent: o, winner })
  if (winner === 'player')
    player.score++
  else if (winner === 'opponent')
    opponent.score++

  afterEffects(p, o, pEffect, oEffect)

  useTimeoutFn(() => {
    player.hand = player.hand.filter(c => c.id !== selectedPlayer.value!.id)
    opponent.hand = opponent.hand.filter(c => c.id !== selectedOpponent.value!.id)
    selectedPlayer.value = null
    selectedOpponent.value = null
    hiddenPlayerCards.clear()
    hiddenOpponentCards.clear()
    revealed.value = false
    roundWinner.value = null
    const gameWinner = player.score >= 2 ? 'player' : opponent.score >= 2 ? 'opponent' : null
    if (gameWinner) {
      emit('gameEnd', gameWinner)
      emit(gameWinner === 'player' ? 'win' : 'lose')
    }
    else {
      emit('turnStart', 'player')
    }
  }, 1200)
}

onMounted(reset)
</script>

<template>
  <div ref="wrapper" class="relative flex flex-1 flex-col items-center gap-2 bg-[url('/textures/table.jpg')] bg-cover p-2" md="p-4">
    <div class="text-sm font-bold">
      {{ player.score }} - {{ opponent.score }}
    </div>
    <div class="w-full flex flex-wrap justify-center gap-1">
      <MinigameShlagCard
        v-for="c in opponent.hand"
        :key="c.id"
        :card="c"
        :size="cardSize"
        :class="hiddenOpponentCards.has(c.id) ? 'invisible' : ''"
      />
    </div>
    <div class="mt-auto w-full flex flex-wrap justify-center gap-1">
      <MinigameShlagCard
        v-for="c in player.hand"
        :key="c.id"
        :card="c"
        :size="cardSize"
        :class="hiddenPlayerCards.has(c.id) ? 'invisible' : ''"
        selectable
        highlight
        @select="play(c)"
      />
    </div>
    <div v-if="history.length" class="w-full text-xs" md="w-1/2">
      <div v-for="(h, i) in history" :key="i" class="border-b py-1">
        {{ h.player.name }} vs {{ h.opponent.name }} - {{ h.winner }}
      </div>
    </div>
    <div
      v-if="selectedPlayer && selectedOpponent"
      class="absolute inset-0 flex items-center justify-center gap-2 bg-black/50"
    >
      <MinigameShlagCard
        :card="selectedPlayer"
        :revealed="revealed"
        :size="cardSize"
        :class="roundWinner === 'player' ? 'animate-pulse-alt' : roundWinner === 'opponent' ? 'animate-defeat' : ''"
      />
      <span class="font-bold">VS</span>
      <MinigameShlagCard
        :card="selectedOpponent"
        :revealed="revealed"
        :size="cardSize"
        :class="roundWinner === 'opponent' ? 'animate-pulse-alt' : roundWinner === 'player' ? 'animate-defeat' : ''"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes defeat {
  from {
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(-90deg) translateY(10%);
    opacity: 0.6;
  }
}

.animate-defeat {
  animation: defeat 0.3s ease forwards;
}
</style>
