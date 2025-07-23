<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { computed, ref } from 'vue'
import { allShlagemons } from '~/data/shlagemons'

const emit = defineEmits<{ (e: 'win'): void, (e: 'lose'): void }>()

const messages = [
  'Tu te rapproches... ou pas.',
  'Ce n\u2019est pas \u00E7a, mais tu fais de ton mieux, petit Shlag.',
  'Essaie encore, champion du n\u00E9ant.',
  'T\u2019as choisi Fromagron ? S\u00E9rieux ?',
  'T\u2019es \u00E0 deux doigts de faire un pet c\u00E9r\u00E9bral.',
]

const palette = allShlagemons.slice(0, 10)
const comboLength = 6
const maxAttempts = 10

const solution = ref<string[]>([])
const attempts = ref<string[][]>([])
const feedback = ref<('green' | 'yellow' | 'gray')[][]>([])
const guess = ref<(string | null)[]>(
  Array.from({ length: comboLength }).fill(null),
)
const selected = ref<number | null>(null)
const message = ref('')
const attemptsLeft = computed(() => maxAttempts - attempts.value.length)

function initGame() {
  solution.value = Array.from({ length: comboLength }, () => {
    return palette[Math.floor(Math.random() * palette.length)].id
  })
  attempts.value = []
  feedback.value = []
  guess.value = Array.from({ length: comboLength }).fill(null)
  selected.value = null
  message.value = ''
}

function choose(id: string) {
  if (selected.value === null)
    return
  guess.value[selected.value] = id
  selected.value = null
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
    message.value = 'T\u2019as perc\u00E9 le cerveau d\u2019un Shlag !'
    useTimeoutFn(() => emit('win'), 1200)
  }
  else if (attempts.value.length >= maxAttempts) {
    message.value = 'M\u00EAme un Petmorv y serait arriv\u00E9'
    useTimeoutFn(() => emit('lose'), 1200)
  }
  else {
    message.value = messages[Math.floor(Math.random() * messages.length)]
    guess.value = Array.from({ length: comboLength }).fill(null)
  }
}

initGame()
</script>

<template>
  <div class="h-full w-full flex flex-col items-center gap-2 p-2" md="p-4">
    <div class="text-sm font-bold">
      {{ attemptsLeft }} tentatives restantes
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
            && message !== 'T\u2019as perc\u00e9 le cerveau d\u2019un Shlag !'
        "
        class="flex items-center justify-between"
      >
        <div class="flex gap-1">
          <button
            v-for="(_, i) in guess"
            :key="i"
            class="h-8 w-8 flex-center border rounded bg-gray-100 dark:bg-gray-700"
            :class="selected === i ? 'animate-pulse-alt' : ''"
            @click="selected = i"
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
          Valider
        </UiButton>
      </div>
    </div>
    <div
      v-if="selected !== null"
      class="w-full flex gap-1 overflow-x-auto border-t p-1"
    >
      <UiTooltip v-for="m in palette" :key="m.id" :text="m.name" is-button>
        <button class="h-10 w-10 flex-shrink-0" @click="choose(m.id)">
          <img
            :src="`/shlagemons/${m.id}/${m.id}.png`"
            class="h-full w-full"
            :alt="m.name"
          >
        </button>
      </UiTooltip>
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
</style>
