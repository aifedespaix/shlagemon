<script setup lang="ts">
/**
 * Page to import a saved game from a `.shlag` file.
 * - Drag & drop + click-to-browse
 * - Keyboard accessible
 * - File preview (name/size/date)
 * - Summary preview (mons/currencies/playtime)
 * - Confirm dialog with explicit acknowledgement
 * - Robust focus management & ARIA live regions
 */
import type { GameSave } from '~/utils/save-code'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { applySave, importSave } from '~/utils/save-code'

/** === Composables & i18n ============================================== */
const { t } = useI18n()
const { formatDuration } = useFormatDuration()
const { copy } = useClipboard() // optional; used for small UX touch (copy error)
usePageHead({
  title: () => t('pages.save.ImportPage.title'),
  description: () => t('pages.save.ImportPage.description'),
})

/** === Types ============================================================ */
interface SaveSummary {
  readonly mons: number
  readonly shlagidolar: number
  readonly shlagidiamond: number
  readonly playtime: number
}

/** === Refs & State ===================================================== */
const titleRef = ref<HTMLHeadingElement | null>(null)
const dropZoneRef = ref<HTMLElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const confirmButtonRef = ref<HTMLButtonElement | null>(null)
const previouslyFocused = ref<HTMLElement | null>(null)

const loading = ref(false)
const error = ref<string | null>(null)
const info = ref<string | null>(null) // non-blocking feedback
const fileMeta = reactive<{ name: string | null, size: number, mtime: number | null }>({
  name: null,
  size: 0,
  mtime: null,
})

const saveData = ref<GameSave | null>(null)
const summary = reactive<SaveSummary>({
  mons: 0,
  shlagidolar: 0,
  shlagidiamond: 0,
  playtime: 0,
})

const showConfirm = ref(false)
const acknowledgeOverwrite = ref(false)

/** === Derived ========================================================== */
const hasPreview = computed(() => !!saveData.value && !loading.value)
const fileSizePretty = computed(() =>
  fileMeta.size
    ? new Intl.NumberFormat(undefined, { style: 'unit', unit: 'byte', unitDisplay: 'narrow' }).format(fileMeta.size)
    : '',
)
const fileDatePretty = computed(() =>
  fileMeta.mtime ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(fileMeta.mtime) : '',
)
const canConfirmImport = computed(() => !!saveData.value && acknowledgeOverwrite.value && !loading.value)

/** === Drop Zone (vueuse) ============================================== */
const { isOverDropZone } = useDropZone(dropZoneRef, (files) => {
  if (files?.length)
    void handleFile(files[0])
}, { dataTypes: ['*/*'] })

/** === Lifecycle ======================================================== */
onMounted(() => {
  // Announce page context to SR users & place focus
  titleRef.value?.focus()
})

/** === Handlers ========================================================= */
function openFilePicker() {
  if (!loading.value)
    fileInputRef.value?.click()
}

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file)
    await handleFile(file)
  // allow selecting same file again
  input.value = ''
}

function resetSelection() {
  saveData.value = null
  fileMeta.name = null
  fileMeta.size = 0
  fileMeta.mtime = null
  summary.mons = 0
  summary.shlagidolar = 0
  summary.shlagidiamond = 0
  summary.playtime = 0
  acknowledgeOverwrite.value = false
  info.value = null
  error.value = null
}

/** Lightweight extension validation to avoid common mistakes */
function isShlagFile(file: File): boolean {
  // Accept .shlag strictly, but also tolerate pasted/renamed JSON when needed
  return /\.shlag$/i.test(file.name)
}

async function handleFile(file: File) {
  if (loading.value)
    return
  error.value = null
  info.value = null

  if (!isShlagFile(file)) {
    error.value = t('pages.save.ImportPage.errorInvalid') // reuse existing key
    return
  }

  loading.value = true
  try {
    const text = await file.text()
    const data = importSave(text.trim())
    if (!data) {
      error.value = t('pages.save.ImportPage.errorInvalid')
      resetSelection()
      return
    }

    saveData.value = data
    fileMeta.name = file.name
    fileMeta.size = file.size
    fileMeta.mtime = file.lastModified || null

    // Extract summary safely
    const rawDex = (data as unknown as { shlagedex?: { shlagemons?: unknown[] } }).shlagedex
    const rawGame = (data as unknown as { game?: { shlagidolar?: number, shlagidiamond?: number } }).game
    const rawPlay = (data as unknown as { playtime?: { seconds?: number } }).playtime

    summary.mons = Array.isArray(rawDex?.shlagemons) ? rawDex!.shlagemons!.length : 0
    summary.shlagidolar = Number.isFinite(rawGame?.shlagidolar) ? (rawGame!.shlagidolar as number) : 0
    summary.shlagidiamond = Number.isFinite(rawGame?.shlagidiamond) ? (rawGame!.shlagidiamond as number) : 0
    summary.playtime = Number.isFinite(rawPlay?.seconds) ? (rawPlay!.seconds as number) : 0

    info.value = t('pages.save.ImportPage.fileReady') // add this key in i18n
  }
  catch {
    error.value = t('pages.save.ImportPage.errorInvalid')
    resetSelection()
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
    acknowledgeOverwrite.value = false
    previouslyFocused.value?.focus()
  }
})

async function confirmImport() {
  if (!saveData.value || !canConfirmImport.value)
    return
  loading.value = true
  showConfirm.value = false
  try {
    applySave(saveData.value)
    // Redirect to root to ensure a clean state (service worker + stores)
    window.location.replace('/')
  }
  catch {
    error.value = t('pages.save.ImportPage.errorApply')
    loading.value = false
  }
}

/** === A11y helpers ===================================================== */
function onDropzoneKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    openFilePicker()
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl p-4 sm:p-8">
    <!-- Page Header -->
    <header class="flex flex-col items-center gap-4">
      <img
        src="/logo.webp"
        class="max-w-56 w-full select-none md:max-w-72"
        alt=""
        aria-hidden="true"
        draggable="false"
      >
      <h1
        ref="titleRef"
        tabindex="-1"
        class="text-center text-2xl font-800 leading-tight sm:text-3xl focus:outline-none"
      >
        {{ t('pages.save.ImportPage.title') }}
      </h1>
      <p class="text-center text-sm text-gray-600 dark:text-gray-300">
        {{ t('pages.save.ImportPage.subtitle') /* add: "Importez une sauvegarde .shlag pour remplacer vos données locales." */ }}
      </p>
    </header>

    <!-- Live Regions -->
    <div class="sr-only" role="status" aria-live="polite">
      <span v-if="loading">{{ t('common.loading') }}</span>
      <span v-else-if="info">{{ info }}</span>
    </div>
    <p
      v-if="error"
      class="mt-4 border border-red-500/30 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300"
      role="alert"
    >
      {{ error }}
      <UiButton
        v-if="copy && error"
        class="ml-2 align-middle text-xs"
        size="sm"
        type="ghost"
        @click="copy(error!)"
      >
        {{ t('common.copy') }}
      </UiButton>
    </p>

    <!-- Dropzone -->
    <section class="mt-6">
      <div
        ref="dropZoneRef"
        class="group relative w-full cursor-pointer border-2 rounded-xl border-dashed bg-white/60 p-6 text-center transition-all data-[over=true]:(border-blue-500 bg-blue-50/80 dark:bg-blue-900/25) hover:border-blue-500/60 dark:bg-gray-900/40 sm:p-8 hover:shadow-lg focus-within:(outline-none ring-2 ring-blue-500/50)"
        :data-over="isOverDropZone"
        role="button"
        :aria-label="t('pages.save.ImportPage.drop')"
        tabindex="0"
        @click="openFilePicker"
        @keydown="onDropzoneKeydown"
      >
        <div
          class="grid mx-auto h-14 w-14 place-items-center border border-gray-300/60 rounded-full transition-all group-hover:(scale-105) dark:border-gray-700/60 data-[over=true]:(border-blue-400)"
          :data-over="isOverDropZone"
          aria-hidden="true"
        >
          <div i-carbon-upload class="text-3xl opacity-80" />
        </div>
        <p class="mt-3 font-600">
          {{ t('pages.save.ImportPage.drop') }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ t('pages.save.ImportPage.hint', { ext: '.shlag' }) /* add: "Cliquez ou glissez-déposez un fichier {ext}" */ }}
        </p>

        <!-- Soft overlay when dragging -->
        <div
          v-show="isOverDropZone"
          class="pointer-events-none absolute inset-0 rounded-xl bg-blue-400/10 backdrop-blur-[1px] transition-opacity"
          aria-hidden="true"
        />
      </div>

      <input
        ref="fileInputRef"
        type="file"
        accept=".shlag"
        class="hidden"
        :aria-label="t('pages.save.ImportPage.select')"
        @change="onFileChange"
      >
    </section>

    <!-- Preview + Summary -->
    <Transition name="fade-slide">
      <section v-if="hasPreview" class="grid mt-6 gap-4">
        <!-- Warning -->
        <div
          class="flex items-start gap-3 border border-amber-400/30 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-900/20 dark:text-amber-100"
          role="alert"
        >
          <div i-carbon-warning class="mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p class="font-700">
              {{ t('pages.save.ImportPage.warningTitle') /* add: "Attention : import destructif" */ }}
            </p>
            <p>
              {{ t('pages.save.ImportPage.warning') /* existing key */ }}
            </p>
          </div>
        </div>

        <!-- File card -->
        <div class="border border-gray-300 rounded-lg bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="min-w-0 flex items-center gap-3">
              <div class="grid h-10 w-10 place-items-center rounded-md bg-gray-100 dark:bg-gray-700">
                <div i-carbon-document class="text-lg" aria-hidden="true" />
              </div>
              <div class="min-w-0">
                <p class="truncate font-700">
                  {{ fileMeta.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  <span v-if="fileSizePretty">{{ fileSizePretty }}</span>
                  <span v-if="fileDatePretty"> • {{ fileDatePretty }}</span>
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UiButton type="ghost" size="sm" @click="resetSelection">
                <div i-carbon-trash-can />
                <span class="sr-only">{{ t('common.remove') }}</span>
              </UiButton>
              <UiButton size="sm" @click="showConfirm = true">
                <div i-carbon-upload />
                {{ t('pages.save.ImportPage.import') }}
              </UiButton>
            </div>
          </div>
        </div>

        <!-- Summary card -->
        <div class="border border-gray-300 rounded-lg bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 class="mb-3 text-lg font-800">
            {{ t('pages.save.ImportPage.summary.title') }}
          </h2>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div class="border border-gray-200 rounded-md p-3 dark:border-gray-700">
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ t('pages.save.ImportPage.summary.monsLabel') /* add key */ }}
              </p>
              <p class="text-xl font-800">
                {{ summary.mons }}
              </p>
            </div>
            <div class="border border-gray-200 rounded-md p-3 dark:border-gray-700">
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ t('pages.save.ImportPage.summary.shlagidolarLabel') /* add key */ }}
              </p>
              <p class="text-xl font-800">
                {{ summary.shlagidolar }}
              </p>
            </div>
            <div class="border border-gray-200 rounded-md p-3 dark:border-gray-700">
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ t('pages.save.ImportPage.summary.shlagidiamondLabel') /* add key */ }}
              </p>
              <p class="text-xl font-800">
                {{ summary.shlagidiamond }}
              </p>
            </div>
            <div class="border border-gray-200 rounded-md p-3 dark:border-gray-700">
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ t('pages.save.ImportPage.summary.playtimeLabel') /* add key */ }}
              </p>
              <p class="text-xl font-800">
                {{ formatDuration(summary.playtime) }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Transition>

    <!-- Loader (centered) -->
    <div v-if="loading" class="grid mt-8 place-items-center">
      <UiLoader size="lg" />
      <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {{ t('common.pleaseWait') }}
      </p>
    </div>
  </div>

  <!-- Confirm Modal -->
  <UiModal v-model="showConfirm" aria-labelledby="confirmTitle" @close="showConfirm = false">
    <div class="flex flex-col gap-4">
      <h2 id="confirmTitle" class="text-lg font-800">
        {{ t('pages.save.ImportPage.confirmTitle') }}
      </h2>

      <!-- Recap list in a11y-friendly format -->
      <dl class="grid grid-cols-1 gap-3 rounded-md bg-gray-50 p-3 sm:grid-cols-2 dark:bg-gray-900/40">
        <div>
          <dt class="text-xs text-gray-500 dark:text-gray-400">
            {{ t('pages.save.ImportPage.summary.monsLabel') }}
          </dt>
          <dd class="font-700">
            {{ summary.mons }}
          </dd>
        </div>
        <div>
          <dt class="text-xs text-gray-500 dark:text-gray-400">
            {{ t('pages.save.ImportPage.summary.playtimeLabel') }}
          </dt>
          <dd class="font-700">
            {{ formatDuration(summary.playtime) }}
          </dd>
        </div>
        <div>
          <dt class="text-xs text-gray-500 dark:text-gray-400">
            {{ t('pages.save.ImportPage.summary.shlagidolarLabel') }}
          </dt>
          <dd class="font-700">
            {{ summary.shlagidolar }}
          </dd>
        </div>
        <div>
          <dt class="text-xs text-gray-500 dark:text-gray-400">
            {{ t('pages.save.ImportPage.summary.shlagidiamondLabel') }}
          </dt>
          <dd class="font-700">
            {{ summary.shlagidiamond }}
          </dd>
        </div>
      </dl>

      <!-- Acknowledgement -->
      <label class="flex select-none items-start gap-2 text-sm">
        <input
          v-model="acknowledgeOverwrite"
          type="checkbox"
          class="mt-0.5 h-4 w-4 border-gray-300 rounded dark:border-gray-600"
          aria-describedby="confirmTitle"
        >
        <span>
          {{ t('pages.save.ImportPage.acknowledge') /* add: "Je comprends que cette action remplace TOUTES mes données locales." */ }}
        </span>
      </label>

      <div class="mt-2 flex justify-end gap-2">
        <UiButton type="default" @click="showConfirm = false">
          {{ t('pages.save.ImportPage.cancel') }}
        </UiButton>
        <UiButton
          ref="confirmButtonRef"
          class="flex items-center gap-1"
          :disabled="!canConfirmImport"
          @click="confirmImport"
        >
          <div i-carbon-checkmark />
          {{ t('pages.save.ImportPage.confirm') }}
        </UiButton>
      </div>
    </div>
  </UiModal>
</template>

<style scoped>
/* === Subtle entrance for preview blocks ================================== */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

/* Reduce motion for users preferring fewer animations */
@media (prefers-reduced-motion: reduce) {
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: none !important;
  }
}
</style>
