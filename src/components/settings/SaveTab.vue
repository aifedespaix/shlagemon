<script setup lang="ts">
import { toast } from '~/modules/toast'
import { applySave, collectSave, exportSave, importSave } from '~/utils/save-code'

const emit = defineEmits<{ (e: 'remove'): void }>()
const { t } = useI18n()
const playtime = usePlaytimeStore()
const exportCode = ref('')
const importCode = ref('')
const showImport = ref(false)
const copied = ref(false)
const fileInput = ref<HTMLInputElement>()
const generating = ref(false)
const loading = ref(false)

async function generateExport() {
  generating.value = true
  await nextTick()
  await new Promise(resolve => setTimeout(resolve))
  exportCode.value = exportSave(collectSave())
  generating.value = false
}

async function copyExport() {
  if (!exportCode.value)
    await generateExport()
  navigator.clipboard.writeText(exportCode.value)
  copied.value = true
  toast.success(t('components.settings.SaveTab.copied'))
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

function downloadExport() {
  if (!exportCode.value)
    generateExport()
  const blob = new Blob([exportCode.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'shlagemon-save.shlag'
  link.click()
  URL.revokeObjectURL(url)
}

async function loadImport() {
  loading.value = true
  await nextTick()
  await new Promise(resolve => setTimeout(resolve))
  const data = importSave(importCode.value)
  if (!data) {
    toast.error(t('components.settings.SaveTab.invalid'))
    loading.value = false
    return
  }
  applySave(data)
  toast.success(t('components.settings.SaveTab.loaded'))
  window.location.reload()
}

function triggerFileInput() {
  fileInput.value?.click()
}

function loadFromFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return
  file.text().then((text) => {
    importCode.value = text.trim()
    showImport.value = true
  })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-center text-lg font-bold">
      {{ t('components.settings.SettingsModal.tabs.save') }}
    </h3>
    <p class="text-center">
      {{ t('components.settings.SaveTab.playtime', { minutes: playtime.minutes }) }}
    </p>
    <section class="flex flex-col items-center gap-2">
      <p class="text-center text-sm text-gray-600 dark:text-gray-300">
        {{ t('components.settings.SaveTab.exportDesc') }}
      </p>
      <label v-if="exportCode" class="font-bold">
        {{ t('components.settings.SaveTab.exportLabel') }}
      </label>
      <textarea
        v-if="exportCode"
        :value="exportCode"
        readonly
        rows="4"
        class="w-full border border-gray-300 rounded bg-gray-100 p-2 text-xs font-mono dark:border-gray-700 dark:bg-gray-900"
        @focus="($event.target as HTMLTextAreaElement).select()"
      />
      <div v-if="exportCode" class="w-full flex gap-2">
        <UiButton
          class="flex flex-1 items-center justify-center gap-1"
          :disabled="generating"
          @click="generateExport"
        >
          <UiLoader v-if="generating" size="xs" />
          <template v-else>
            <div i-carbon-refresh />
            {{ t('components.settings.SaveTab.generate') }}
          </template>
        </UiButton>
        <UiButton class="flex flex-1 items-center justify-center gap-1" @click="copyExport">
          <div :class="copied ? 'i-carbon-checkmark' : 'i-carbon-copy'" />
          {{ copied ? t('components.settings.SaveTab.copied') : t('components.settings.SaveTab.copy') }}
        </UiButton>
        <UiButton class="flex flex-1 items-center justify-center gap-1" @click="downloadExport">
          <div i-carbon-download />
          {{ t('components.settings.SaveTab.download') }}
        </UiButton>
      </div>
      <UiButton
        v-else
        class="mx-auto flex items-center gap-1"
        :disabled="generating"
        @click="generateExport"
      >
        <UiLoader v-if="generating" size="xs" />
        <template v-else>
          <div i-carbon-play />
          {{ t('components.settings.SaveTab.generate') }}
        </template>
      </UiButton>
    </section>

    <section class="flex flex-col items-center gap-2">
      <p class="text-center text-sm text-gray-600 dark:text-gray-300">
        {{ t('components.settings.SaveTab.importDesc') }}
      </p>
      <label v-if="showImport" class="font-bold">
        {{ t('components.settings.SaveTab.importLabel') }}
      </label>
      <textarea
        v-if="showImport"
        v-model="importCode"
        rows="4"
        class="w-full border border-gray-300 rounded bg-white p-2 text-xs font-mono dark:border-gray-700 dark:bg-gray-800"
      />
      <div v-if="showImport" class="w-full flex gap-2">
        <UiButton
          class="flex flex-1 items-center justify-center gap-1"
          :disabled="loading"
          @click="loadImport"
        >
          <UiLoader v-if="loading" size="xs" />
          <template v-else>
            <div i-carbon-upload />
            {{ t('components.settings.SaveTab.load') }}
          </template>
        </UiButton>
        <UiButton type="default" class="flex flex-1 items-center justify-center gap-1" @click="triggerFileInput">
          <div i-carbon-folder-open />
          {{ t('components.settings.SaveTab.loadFile') }}
        </UiButton>
        <UiButton type="danger" class="flex flex-1 items-center justify-center gap-1" @click="emit('remove')">
          <div i-carbon-trash-can />
          {{ t('components.settings.SaveTab.remove') }}
        </UiButton>
      </div>
      <UiButton
        v-else
        class="mx-auto flex items-center gap-1"
        @click="showImport = true"
      >
        <div i-carbon-upload />
        {{ t('components.settings.SaveTab.load') }}
      </UiButton>
      <input
        ref="fileInput"
        type="file"
        accept=".txt"
        class="hidden"
        :aria-label="t('components.settings.SaveTab.loadFile')"
        @change="loadFromFile"
      >
    </section>
  </div>
</template>
