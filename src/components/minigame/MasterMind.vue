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
function getFeedbackBg(fb: 'green' | 'yellow' | 'gray' | undefined) {
  if (fb === 'green') return 'bg-green-500/80 dark:bg-green-600/70';
  if (fb === 'yellow') return 'bg-yellow-400/80 dark:bg-yellow-500/70';
  if (fb === 'gray') return 'bg-gray-400/80 dark:bg-gray-600/70';
  return 'bg-gradient-to-br from-neutral-900/70 to-neutral-800/70 dark:from-neutral-800 dark:to-neutral-950';
}
</script>

<template>
  <div class="relative aspect-video h-full w-full flex flex-col items-center gap-2">
    <div class="text-xs font-bold">
      {{ t('components.minigame.MasterMind.attemptsLeft', { n: attemptsLeft }) }}
    </div>
    <div class="w-full flex-1 overflow-y-auto flex flex-col gap-1 tiny-scrollbar">
      <TransitionGroup name="line">
        <!-- Chaque ligne (historique ou active), TOUJOURS 7 colonnes -->
        <div
          v-for="(att, i) in attempts"
          :key="`att-${i}`"
          class="grid grid-cols-7 gap-1 items-center w-full"
        >
          <!-- 6 cases réponse -->
          <div
            v-for="(id, j) in att"
            :key="`his-case-${j}`"
            class="h-14 md:h-16 w-full flex-center rounded-xl border border-white/10 dark:border-white/10
              shadow-xl relative overflow-hidden group transition backdrop-blur"
            :class="[
              getFeedbackBg(feedback[i]?.[j]),
              bounce[i]?.[j] ? 'animate-bounce animate-count-1' : '',
              feedback[i]?.[j] === 'green' ? 'glow-green' : '',
              feedback[i]?.[j] === 'yellow' ? 'glow-yellow' : '',
              feedback[i]?.[j] === 'gray' ? 'glow-gray' : '',
              'focus:(ring-2 ring-sky-500)'
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
          <!-- Colonne 7 (historique : vide) -->
          <div />
        </div>
      </TransitionGroup>

      <!-- Ligne active, TOUJOURS 7 colonnes -->
      <div
        v-if="attemptsLeft > 0 && message !== t('components.minigame.MasterMind.win')"
        class="grid grid-cols-7 gap-1 items-center w-full"
      >
        <button
          v-for="(_, i) in guess"
          :key="`active-case-${i}`"
          type="button"
          class="h-14 md:h-16 w-full flex-center border border-white/10 dark:border-white/10
            rounded-xl bg-gradient-to-br from-sky-900/60 to-slate-900/70 dark:from-sky-800 dark:to-slate-950
            shadow-2xl outline-none transition-all group backdrop-blur"
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
            :disabled="guess.some((v) => !v)"
            class="w-12 h-12 md:w-14 md:h-14 rounded-full flex-center border-2 border-sky-400
              bg-gradient-to-tr from-sky-600/80 to-blue-700/90 text-white font-bold shadow-xl
              outline-none select-none transition-all
              focus:(ring-2 ring-sky-300) active:scale-95"
            :class="{
              'glow-validate': !guess.some((v) => !v),
              'opacity-40 grayscale cursor-not-allowed !glow-validate': guess.some((v) => !v),
              'hover:scale-105': !guess.some((v) => !v)
            }"
            :aria-label="t('components.minigame.MasterMind.validate')"
            @click="validate"
            tabindex="0"
          >
            <span class="i-carbon-checkmark text-2xl md:text-3xl" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <!-- Légende couleurs -->
    <div class="flex justify-center gap-2 text-xs opacity-80 select-none">
      <span class="flex items-center gap-1">
        <span class="inline-block w-4 h-4 rounded-full bg-green-500/80 border border-white/30 mr-1"></span>
        <span>{{ t('components.minigame.MasterMind.legend.correct') }}</span>
      </span>
      <span class="flex items-center gap-1">
        <span class="inline-block w-4 h-4 rounded-full bg-yellow-400/80 border border-white/30 mr-1"></span>
        <span>{{ t('components.minigame.MasterMind.legend.misplaced') }}</span>
      </span>
      <span class="flex items-center gap-1">
        <span class="inline-block w-4 h-4 rounded-full bg-gray-400/80 border border-white/30 mr-1"></span>
        <span>{{ t('components.minigame.MasterMind.legend.absent') }}</span>
      </span>
    </div>

    <!-- Sélecteur de shlagemons -->
    <MinigameMasterMindSelectionModal
      v-model="showPicker"
      :palette="palette"
      @select="choose"
    />

    <!-- Confetti -->
    <div v-if="showConfetti" class="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
      <div class="font-size-22 animate-zoom-in animate-duration-0.5s">
        🎉
      </div>
    </div>
  </div>
</template>
