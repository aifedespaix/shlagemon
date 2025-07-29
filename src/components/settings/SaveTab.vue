<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { applySave, collectSave, exportSave, importSave } from '~/utils/save-code'

const emit = defineEmits<{ (e: 'remove'): void }>()
const { t } = useI18n()
const exportCode = ref('')
const importCode = ref('')

function generateExport() {
  exportCode.value = exportSave(collectSave())
}

function copyExport() {
  if (!exportCode.value)
    generateExport()
  navigator.clipboard.writeText(exportCode.value)
  toast.success(t('components.settings.SaveTab.copied'))
}

function downloadExport() {
  if (!exportCode.value)
    generateExport()
  const blob = new Blob([exportCode.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'shlagemon-save.txt'
  link.click()
  URL.revokeObjectURL(url)
}

function loadImport() {
  const data = importSave(importCode.value)
  if (!data) {
    toast.error(t('components.settings.SaveTab.invalid'))
    return
  }
  applySave(data)
  toast.success(t('components.settings.SaveTab.loaded'))
  window.location.reload()
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <section class="flex flex-col gap-2">
      <label class="font-bold">
        {{ t('components.settings.SaveTab.exportLabel') }}
      </label>
      <textarea
        :value="exportCode"
        readonly
        rows="4"
        class="w-full border border-gray-300 rounded bg-gray-100 p-2 text-xs font-mono dark:border-gray-700 dark:bg-gray-900"
        @focus="($event.target as HTMLTextAreaElement).select()"
      />
      <div class="flex gap-2">
        <UiButton class="flex-1" @click="generateExport">
          {{ t('components.settings.SaveTab.generate') }}
        </UiButton>
        <UiButton class="flex-1" :disabled="!exportCode" @click="copyExport">
          {{ t('components.settings.SaveTab.copy') }}
        </UiButton>
        <UiButton class="flex-1" :disabled="!exportCode" @click="downloadExport">
          {{ t('components.settings.SaveTab.download') }}
        </UiButton>
      </div>
    </section>

    <section class="flex flex-col gap-2">
      <label class="font-bold">
        {{ t('components.settings.SaveTab.importLabel') }}
      </label>
      <textarea
        v-model="importCode"
        rows="4"
        class="w-full border border-gray-300 rounded bg-white p-2 text-xs font-mono dark:border-gray-700 dark:bg-gray-800"
      />
      <div class="flex gap-2">
        <UiButton class="flex-1" @click="loadImport">
          {{ t('components.settings.SaveTab.load') }}
        </UiButton>
        <UiButton type="danger" class="flex-1" @click="emit('remove')">
          {{ t('components.settings.SaveTab.remove') }}
        </UiButton>
      </div>
    </section>
  </div>
</template>
