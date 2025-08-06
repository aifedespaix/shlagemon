<script setup lang="ts">
import type { BaseShlagemon } from '~/type'
import { useTimeoutFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { allShlagemons } from '~/data/shlagemons'
import { useAudioStore } from '~/stores/audio'
import { sample } from '~/utils/random'

const emit = defineEmits<{ (e: 'win'): void, (e: 'lose'): void }>()

const { t, tm } = useI18n()

const messages = computed(() => {
  const list = tm('components.minigame.MasterMind.messages')
  return Array.isArray(list) ? list as string[] : []
})

const PALETTE_SIZE = 12
const palette = ref<BaseShlagemon[]>([])
const comboLength = 6
const maxAttempts = 5

const audio = useAudioStore()
const bounce = ref<boolean[][]>([])

const solution = ref<string[]>([])
const attempts = ref<string[][]>([])
const feedback = ref<('green' | 'yellow' | 'gray')[][]>([])
const guess = ref<(string | null)[]>(
  Array.from({ length: comboLength }).fill(null) as (string | null)[],
)
const selected = ref<number | null>(null)
const showPicker = ref(false)
const showConfetti = ref(false)
const message = ref('')
const attemptsLeft = computed(() => maxAttempts - attempts.value.length)

watch(showPicker, (v) => {
  if (!v)
    selected.value = null
})

function openPicker(i: number) {
  selected.value = i
  showPicker.value = true
}

function initGame() {
  palette.value = sample(allShlagemons, PALETTE_SIZE)
  solution.value = sample(
    palette.value.map(p => p.id),
    comboLength,
  )
  attempts.value = []
  feedback.value = []
  bounce.value = []
  guess.value = Array.from({ length: comboLength }).fill(null) as (string | null)[]
  selected.value = null
  showPicker.value = false
  showConfetti.value = false
  message.value = ''
}

function choose(id: string) {
  if (selected.value === null)
    return
  const existing = guess.value.indexOf(id)
  if (existing !== -1)
    guess.value[existing] = null
  guess.value[selected.value] = id
  selected.value = null
  showPicker.value = false
}

function copyFromHistory(index: number, id: string) {
  if (
    attemptsLeft.value <= 0
    || message.value === t('components.minigame.MasterMind.win')
  ) {
    return
  }
  const existing = guess.value.indexOf(id)
  if (existing !== -1)
    guess.value[existing] = null
  guess.value[index] = id
}

function validate() {
  if (guess.value.some(v => !v))
    return
  const current = guess.value.slice() as string[]
  attempts.value.push(current)
  const res: ('green' | 'yellow' | 'gray')[] = []
  const sol = solution.value.slice()
  const g = current.slice()
  for (let i = 0; i < comboLength; i++) {
    if (g[i] === sol[i]) {
      res[i] = 'green'
      sol[i] = ''
      g[i] = ''
    }
  }
  for (let i = 0; i < comboLength; i++) {
    if (res[i])
      continue
    const idx = sol.indexOf(g[i])
    if (idx > -1) {
      res[i] = 'yellow'
      sol[idx] = ''
    }
    else {
      res[i] = 'gray'
    }
  }
  feedback.value.push(res)
  bounce.value.push(Array.from({ length: comboLength }).fill(false) as boolean[])
  const attemptIndex = attempts.value.length - 1
  res.forEach((r, idx) => {
    useTimeoutFn(() => {
      bounce.value[attemptIndex][idx] = true
      const sfx = r === 'green'
        ? 'mini-game-shlagmind-good'
        : r === 'yellow'
          ? 'mini-game-shlagmind-neutral'
          : 'mini-game-shlagmind-bad'
      audio.playSfx(sfx)
      useTimeoutFn(() => {
        bounce.value[attemptIndex][idx] = false
      }, 500)
    }, idx * 200)
  })
  const win = res.every(r => r === 'green')
  if (win) {
    message.value = t('components.minigame.MasterMind.win')
    showConfetti.value = true
    useTimeoutFn(() => {
      showConfetti.value = false
      emit('win')
    }, 1200)
  }
  else if (attempts.value.length >= maxAttempts) {
    message.value = t('components.minigame.MasterMind.lose')
    useTimeoutFn(() => emit('lose'), 1200)
  }
  else {
    const list = messages.value
    const idx = Math.floor(Math.random() * list.length)
    message.value = t(`components.minigame.MasterMind.messages[${idx}]`)
    guess.value = Array.from({ length: comboLength }).fill(null) as (string | null)[]
  }
}

initGame()
</script>

<template>
  <div class="relative aspect-video h-full w-full flex flex-col items-center gap-2">
    <div class="text-sm font-bold mb-1">
      {{ t('components.minigame.MasterMind.attemptsLeft', { n: attemptsLeft }) }}
    </div>
    <div class="w-full flex-1 overflow-y-auto flex flex-col gap-2">
      <TransitionGroup name="line">
        <!-- Historique -->
        <div
          v-for="(att, i) in attempts"
          :key="`att-${i}`"
          class="grid grid-cols-7 gap-1 items-center w-full"
        >
          <!-- 6 shlagemons réponses -->
          <div
            v-for="(id, j) in att"
            :key="`his-case-${j}`"
            class="h-14 md:h-16 w-full flex-center rounded-xl border-2 bg-gradient-to-br from-neutral-900/70 to-neutral-800/70 dark:from-neutral-800 dark:to-neutral-950 shadow-xl relative overflow-hidden group transition"
            :class="[
              bounce[i]?.[j] ? 'animate-bounce animate-count-1' : '',
              'focus:(ring-2 ring-sky-500)', // Glow focus
            ]"
            tabindex="0"
            role="button"
            :aria-label="palette.find((p) => p.id === id)?.name || ''"
            @click="copyFromHistory(j, id)"
          >
            <img
              :src="`/shlagemons/${id}/${id}.png`"
              class="h-11 w-11 md:h-14 md:w-14 object-contain transition-transform group-hover:scale-110"
              :alt="id"
              draggable="false"
            />
          </div>
          <!-- Feedback colonne 7 -->
          <div class="flex gap-1 justify-center items-center h-14 md:h-16">
            <span
              v-for="(f, k) in feedback[i]"
              :key="`his-fb-${k}`"
              class="h-4 w-4 md:h-5 md:w-5 rounded-full border border-white shadow
                transition"
              :class="[
                f === 'green' ? 'bg-green-500 glow-green' : '',
                f === 'yellow' ? 'bg-yellow-400 glow-yellow' : '',
                f === 'gray' ? 'bg-gray-400' : '',
                bounce[i]?.[k] ? 'animate-bounce animate-count-1' : '',
              ]"
            />
          </div>
        </div>
      </TransitionGroup>

      <!-- Ligne active (toujours 7 colonnes) -->
      <div
        v-if="attemptsLeft > 0 && message !== t('components.minigame.MasterMind.win')"
        class="grid grid-cols-7 gap-1 items-center w-full"
      >
        <!-- 6 cases guess -->
        <button
          v-for="(_, i) in guess"
          :key="`active-case-${i}`"
          type="button"
          class="h-14 md:h-16 w-full flex-center border-2 rounded-xl
            bg-gradient-to-br from-sky-900/60 to-slate-900/70 dark:from-sky-800 dark:to-slate-950
            shadow-2xl outline-none
            transition-all group
            focus:(ring-2 ring-sky-400)"
          :class="[
            selected === i ? 'glow-active scale-105 ring-2 ring-sky-300 z-10' : '',
            guess[i] ? 'hover:scale-105' : '',
          ]"
          tabindex="0"
          :aria-label="guess[i] ? palette.find((p) => p.id === guess[i])?.name : t('components.minigame.MasterMind.selectSlot')"
          @click="openPicker(i)"
        >
          <img
            v-if="guess[i]"
            :src="`/shlagemons/${guess[i]}/${guess[i]}.png`"
            class="h-11 w-11 md:h-14 md:w-14 object-contain transition-transform"
            :alt="guess[i]!"
            draggable="false"
          />
        </button>
        <!-- Colonne 7 = bouton valider -->
        <div class="flex justify-center items-center h-14 md:h-16">
          <button
            type="button"
            class="w-12 h-12 md:w-14 md:h-14 rounded-full flex-center border-2 border-sky-400
              bg-gradient-to-tr from-sky-600/80 to-blue-700/90 text-white font-bold shadow-xl
              outline-none select-none
              glow-validate transition-all
              focus:(ring-2 ring-sky-300)
              active:scale-95"
            :disabled="guess.some((v) => !v)"
            :aria-label="t('components.minigame.MasterMind.validate')"
            @click="validate"
          >
            <span class="i-carbon-checkmark text-2xl md:text-3xl" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <!-- Sélecteur de shlagemons -->
    <MinigameMasterMindSelectionModal
      v-model="showPicker"
      :palette="palette"
      @select="choose"
    />

    <!-- Confetti -->
    <div v-if="showConfetti" class="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
      <div class="confetti">
        🎉
      </div>
    </div>
    <div class="text-center text-xs mt-2 min-h-5">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
/* Glow feedback pastille */
.glow-green {
  box-shadow: 0 0 10px 2px #22c55e99, 0 0 20px 4px #22c55e55;
}
.glow-yellow {
  box-shadow: 0 0 10px 2px #fde04799, 0 0 20px 4px #fde04755;
}

/* Glow selection/valider */
.glow-active {
  box-shadow: 0 0 16px 4px #0ea5e9bb, 0 0 32px 8px #7dd3fc55;
}
.glow-validate {
  box-shadow: 0 0 24px 4px #38bdf8cc, 0 0 48px 8px #60a5fa55;
  animation: glow-breath 2s infinite alternate;
}

@keyframes glow-breath {
  0%   { box-shadow: 0 0 24px 4px #38bdf8cc, 0 0 48px 8px #60a5fa33; }
  100% { box-shadow: 0 0 36px 6px #38bdf8ff, 0 0 60px 14px #38bdf899; }
}

/* Transition de ligne douce */
.line-enter-from { opacity: 0; transform: translateY(10%); }
.line-enter-active { transition: opacity 0.3s, transform 0.3s; }
.line-enter-to { opacity: 1; transform: translateY(0); }

.confetti {
  animation: confetti-pop 0.8s ease forwards;
  font-size: 3rem;
}
@keyframes confetti-pop {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}
</style>
