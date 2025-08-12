<script setup lang="ts">
/**
 * Page allowing the user to import a saved game from a `.shlag` file.
 * Provides drag-and-drop support, a summary preview, and a confirmation dialog
 * before applying the imported data.
 */
import type { GameSave } from '~/utils/save-code'
import { applySave, importSave } from '~/utils/save-code'

const { t } = useI18n()
const { formatDuration } = useFormatDuration()

interface SaveSummary {
  mons: number
  shlagidolar: number
  shlagidiamond: number
  playtime: number
}

const titleRef = ref<HTMLHeadingElement>()
const dropZoneRef = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const confirmButtonRef = ref<HTMLButtonElement | null>(null)
const previouslyFocused = ref<HTMLElement | null>(null)

const loading = ref(false)
const error = ref<string | null>(null)
const saveData = ref<GameSave | null>(null)
const summary = reactive<SaveSummary>({
  mons: 0,
  shlagidolar: 0,
  shlagidiamond: 0,
  playtime: 0,
})
const showConfirm = ref(false)

onMounted(() => {
  titleRef.value?.focus()
})

const { isOverDropZone } = useDropZone(dropZoneRef, (files) => {
  if (files && files.length)
    void handleFile(files[0])
})

function triggerFileInput() {
  fileInput.value?.click()
}

async function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file)
    await handleFile(file)
}

async function handleFile(file: File) {
  error.value = null
  loading.value = true
  try {
    const text = await file.text()
    const data = importSave(text.trim())
    if (!data) {
      error.value = t('pages.save.ImportPage.errorInvalid')
      return
    }
    saveData.value = data
    summary.mons = Array.isArray((data.shlagedex as any)?.shlagemons)
      ? (data.shlagedex as any).shlagemons.length
      : 0
    summary.shlagidolar = (data.game as any)?.shlagidolar ?? 0
    summary.shlagidiamond = (data.game as any)?.shlagidiamond ?? 0
    summary.playtime = (data.playtime as any)?.seconds ?? 0
  }
  catch {
    error.value = t('pages.save.ImportPage.errorInvalid')
    saveData.value = null
  }
  finally {
    loading.value = false
  }
}

watch(showConfirm, (open) => {
  if (open) {
    previouslyFocused.value = document.activeElement as HTMLElement | null
    nextTick(() => confirmButtonRef.value?.focus())
  }
  else {
    previouslyFocused.value?.focus()
  }
})

async function confirmImport() {
  if (!saveData.value)
    return
  loading.value = true
  showConfirm.value = false
  try {
    applySave(saveData.value)
    window.location.reload()
  }
  catch {
    error.value = t('pages.save.ImportPage.errorApply')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4 sm:p-8">
    <h1
      ref="titleRef"
      tabindex="-1"
      class="text-2xl font-bold focus:outline-none"
    >
      {{ t('pages.save.ImportPage.title') }}
    </h1>

    <p v-if="error" role="alert" class="text-red-600 dark:text-red-400">
      {{ error }}
    </p>

    <div
      ref="dropZoneRef"
      class="max-w-lg w-full flex flex-col cursor-pointer items-center justify-center gap-2 border-2 rounded border-dashed p-6 text-center"
      :class="isOverDropZone ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'"
      tabindex="0"
      role="button"
      :aria-label="t('pages.save.ImportPage.drop')"
      @click="triggerFileInput"
      @keydown.enter.prevent="triggerFileInput"
      @keydown.space.prevent="triggerFileInput"
    >
      <div i-carbon-upload class="text-3xl" aria-hidden="true" />
      <p>{{ t('pages.save.ImportPage.drop') }}</p>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept=".shlag"
      class="hidden"
      :aria-label="t('pages.save.ImportPage.select')"
      @change="onFileChange"
    >

    <div v-if="saveData && !loading" class="max-w-lg w-full flex flex-col gap-4">
      <div role="alert" class="rounded bg-yellow-100 p-3 text-sm text-yellow-800">
        {{ t('pages.save.ImportPage.warning') }}
      </div>

      <div class="border border-gray-300 rounded bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <h2 class="mb-2 text-lg font-bold">
          {{ t('pages.save.ImportPage.summary.title') }}
        </h2>
        <ul class="text-sm">
          <li>{{ t('pages.save.ImportPage.summary.mons', { count: summary.mons }) }}</li>
          <li>{{ t('pages.save.ImportPage.summary.shlagidolar', { amount: summary.shlagidolar }) }}</li>
          <li>{{ t('pages.save.ImportPage.summary.shlagidiamond', { amount: summary.shlagidiamond }) }}</li>
          <li>{{ t('pages.save.ImportPage.summary.playtime', { time: formatDuration(summary.playtime) }) }}</li>
        </ul>
      </div>

      <UiButton class="flex items-center self-end gap-1" @click="showConfirm = true">
        <div i-carbon-upload />
        {{ t('pages.save.ImportPage.import') }}
      </UiButton>
    </div>

    <UiLoader v-if="loading" size="lg" />
  </div>

  <UiModal v-model="showConfirm" @close="showConfirm = false">
    <div class="flex flex-col gap-4">
      <h2 class="text-lg font-bold">
        {{ t('pages.save.ImportPage.confirmTitle') }}
      </h2>
      <p>{{ t('pages.save.ImportPage.confirmMessage') }}</p>
      <div class="mt-2 flex justify-end gap-2">
        <UiButton type="default" @click="showConfirm = false">
          {{ t('pages.save.ImportPage.cancel') }}
        </UiButton>
        <UiButton ref="confirmButtonRef" class="flex items-center gap-1" @click="confirmImport">
          <div i-carbon-checkmark />
          {{ t('pages.save.ImportPage.confirm') }}
        </UiButton>
      </div>
    </div>
  </UiModal>
</template>
