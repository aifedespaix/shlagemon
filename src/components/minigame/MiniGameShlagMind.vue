<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { allShlagemons } from '~/data/shlagemons'
import ShlagMindSelectionModal from './ShlagMindSelectionModal.vue'

const emit = defineEmits<{ (e: 'win'): void, (e: 'lose'): void }>()

const { t, tm } = useI18n()

const messages = computed(() =>
  tm('components.minigame.MiniGameShlagMind.messages') as string[],
)

const palette = allShlagemons.slice(0, 12)
const comboLength = 6
const maxAttempts = 5

const solution = ref<string[]>([])
const attempts = ref<string[][]>([])
const feedback = ref<('green' | 'yellow' | 'gray')[][]>([])
const guess = ref<(string | null)[]>(
  Array.from({ length: comboLength }).fill(null),
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
  solution.value = Array.from({ length: comboLength }, () => {
    return palette[Math.floor(Math.random() * palette.length)].id
  })
  attempts.value = []
  feedback.value = []
  guess.value = Array.from({ length: comboLength }).fill(null)
  selected.value = null
  showPicker.value = false
  showConfetti.value = false
  message.value = ''
}

function choose(id: string) {
  if (selected.value === null)
    return
  guess.value[selected.value] = id
  selected.value = null
  showPicker.value = false
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
  const win = res.every(r => r === 'green')
  if (win) {
    message.value = t('components.minigame.MiniGameShlagMind.win')
    showConfetti.value = true
    useTimeoutFn(() => {
      showConfetti.value = false
      emit('win')
    }, 1200)
  }
  else if (attempts.value.length >= maxAttempts) {
    message.value = t('components.minigame.MiniGameShlagMind.lose')
    useTimeoutFn(() => emit('lose'), 1200)
  }
  else {
    const list = messages.value
    message.value = list[Math.floor(Math.random() * list.length)]
    guess.value = Array.from({ length: comboLength }).fill(null)
  }
}

initGame()
</script>

<template>
  <div class="relative aspect-video h-full w-full flex flex-col items-center gap-2 p-2" md="p-4">
    <div class="text-sm font-bold">
      {{ t('components.minigame.MiniGameShlagMind.attemptsLeft', { n: attemptsLeft }) }}
    </div>
    <div class="w-full flex flex-1 flex-col gap-2 overflow-y-auto">
      <TransitionGroup name="line">
        <div
          v-for="(att, i) in attempts"
          :key="`att-${i}`"
          class="flex items-center justify-between"
        >
          <div class="flex gap-1">
            <UiTooltip
              v-for="(id, j) in att"
              :key="j"
              :text="palette.find((p) => p.id === id)?.name || ''"
            >
              <img
                :src="`/shlagemons/${id}/${id}.png`"
                class="h-8 w-8"
                :alt="id"
              >
            </UiTooltip>
          </div>
          <div class="flex gap-1">
            <span
              v-for="(f, k) in feedback[i]"
              :key="k"
              class="h-3 w-3 rounded-full"
              :class="{
                'bg-green-500': f === 'green',
                'bg-yellow-400': f === 'yellow',
                'bg-gray-500': f === 'gray',
              }"
            />
          </div>
        </div>
      </TransitionGroup>
      <div
        v-if="
          attemptsLeft > 0
            && message !== t('components.minigame.MiniGameShlagMind.win')
        "
        class="flex items-center justify-between"
      >
        <div class="flex gap-1">
          <button
            v-for="(_, i) in guess"
            :key="i"
            class="h-8 w-8 flex-center border rounded bg-gray-100 dark:bg-gray-700"
            :class="selected === i ? 'animate-pulse-alt' : ''"
            @click="openPicker(i)"
          >
            <img
              v-if="guess[i]"
              :src="`/shlagemons/${guess[i]}/${guess[i]}.png`"
              class="h-full w-full"
              :alt="guess[i]!"
            >
          </button>
        </div>
        <UiButton
          type="primary"
          :disabled="guess.some((v) => !v)"
          @click="validate"
        >
          {{ t('components.minigame.MiniGameShlagMind.validate') }}
        </UiButton>
      </div>
    </div>
    <ShlagMindSelectionModal
      v-model="showPicker"
      :palette="palette"
      @select="choose"
    />
    <div v-if="showConfetti" class="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div class="confetti">
        🎉
      </div>
    </div>
    <div class="text-center text-xs">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
.line-enter-from {
  opacity: 0;
  transform: translateY(10%);
}
.line-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.line-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.confetti {
  animation: confetti-pop 0.8s ease forwards;
  font-size: 3rem;
}

@keyframes confetti-pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
