<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { storeToRefs } from 'pinia'
import { profMerdant } from '~/data/characters/prof-merdant'
import { createLaboratoryScene } from '~/modules/three/laboratoryScene'

const laboratory = useLaboratoryStore()
const { unlocked } = storeToRefs(laboratory)
const { t } = useI18n()

const isUnlocked = computed(() => unlocked.value)
const rendererHost = ref<HTMLElement | null>(null)
const hasStarted = ref(false)

let sceneCleanup: (() => void) | null = null

function mountScene() {
  if (!rendererHost.value || sceneCleanup || !hasStarted.value)
    return
  sceneCleanup = createLaboratoryScene(rendererHost.value).cleanup
}

function disposeScene() {
  if (!sceneCleanup)
    return
  sceneCleanup()
  sceneCleanup = null
}

const shouldShowIntro = computed(() => isUnlocked.value && !hasStarted.value)

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'intro',
    text: t('components.panel.Laboratory.introDialog.text'),
    responses: [
      {
        label: t('components.panel.Laboratory.introDialog.embark'),
        type: 'primary',
        action: () => {
          hasStarted.value = true
        },
      },
    ],
  },
])

watch([isUnlocked, hasStarted], ([unlocked, started]) => {
  if (unlocked && started)
    nextTick(mountScene)
  else
    disposeScene()
})

watch(() => rendererHost.value, () => {
  if (!isUnlocked.value || !hasStarted.value)
    return
  disposeScene()
  nextTick(mountScene)
})

onUnmounted(disposeScene)
</script>

<template>
  <LayoutTitledPanel
    :title="''"
    exit-text=""
    :show-footer="false"
  >
    <div class="relative h-full flex flex-1 overflow-hidden">
      <div
        v-if="shouldShowIntro"
        class="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/80 p-4"
      >
        <DialogBox
          :character="profMerdant"
          :dialog-tree="dialogTree"
        />
      </div>

      <div
        v-if="isUnlocked"
        ref="rendererHost"
        class="absolute inset-0"
      />

      <div
        v-else
        class="relative z-10 flex h-full w-full items-center justify-center p-4"
      >
        <UiInfo color="alert" class="max-w-md">
          {{ t('components.panel.Laboratory.locked') }}
        </UiInfo>
      </div>
    </div>
  </LayoutTitledPanel>
</template>
