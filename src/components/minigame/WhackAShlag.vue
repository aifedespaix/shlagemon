<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Button from '~/components/ui/Button.vue'
import ImageByBackground from '~/components/ui/ImageByBackground.vue'
import { allShlagemons } from '~/data/shlagemons'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'

const panel = useMainPanelStore()
const mini = useMiniGameStore()

const slots = ref<(string | null)[]>(Array.from({ length: 9 }).fill(null))
let spawnTimer: number | undefined

function spawn() {
  if (!mini.isRunning)
    return
  const idx = Math.floor(Math.random() * 9)
  const mon = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
  slots.value = Array.from({ length: 9 }).fill(null)
  slots.value[idx] = mon.id
}

function hit(i: number) {
  if (slots.value[i]) {
    mini.hit()
    slots.value[i] = null
  }
}

function quit() {
  mini.finish()
  panel.showVillage()
}

onMounted(() => {
  mini.start()
  spawn()
  spawnTimer = window.setInterval(spawn, 800)
})

onUnmounted(() => {
  clearInterval(spawnTimer)
  if (mini.isRunning)
    mini.finish()
})
</script>

<template>
  <div class="flex flex-col items-center gap-2" md="gap-3">
    <div class="text-sm">
      Temps : {{ mini.timeLeft }}s - Score : {{ mini.score }}
    </div>
    <div class="grid grid-cols-3 grid-rows-3 gap-1" md="gap-2">
      <button
        v-for="(s, i) in slots"
        :key="i"
        class="h-20 w-20 rounded bg-gray-200 dark:bg-gray-700"
        md="h-24 w-24"
        @click="hit(i)"
      >
        <UiImageByBackground
          v-if="s"
          :src="`/shlagemons/${s}/${s}.png`"
          alt="slug"
          class="h-full w-full"
        />
      </button>
    </div>
    <div class="text-sm">
      Niveau : {{ mini.level }}
    </div>
    <UiButton class="text-xs" @click="quit">
      Quitter
    </UiButton>
  </div>
</template>
