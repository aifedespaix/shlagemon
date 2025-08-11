<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface PwaUpdateStore {
  needRefresh: boolean
  reload: () => Promise<void>
}

const store = usePwaUpdateStore() as unknown as PwaUpdateStore
const { t } = useI18n()

/** === UI State ========================================================= */
const isUpdating = ref(false)
const hasError = ref<Error | null>(null)

/** Focus sur l’action principale dès l’apparition */
const reloadBtnRef = ref<HTMLButtonElement | null>(null)
watch(
  () => store.needRefresh,
  async (val) => {
    if (val) {
      await nextTick()
      reloadBtnRef.value?.focus()
    }
    else {
      isUpdating.value = false
      hasError.value = null
    }
  },
  { immediate: true },
)

/** Message statuts */
const statusMessage = computed(() => {
  if (hasError.value)
    return t('components.UpdateSnackbar.error', 'La mise à jour a échoué. Réessaie.')
  if (isUpdating.value)
    return t('components.UpdateSnackbar.updating', 'Mise à jour en cours… cela peut prendre quelques secondes.')
  return t('components.UpdateSnackbar.updateAvailable', 'Une mise à jour est disponible.')
})

/** Reload principal (async) */
async function handleReload() {
  if (isUpdating.value)
    return
  isUpdating.value = true
  hasError.value = null
  try {
    await store.reload()
  }
  catch (e) {
    hasError.value = e instanceof Error ? e : new Error('Update failed')
    isUpdating.value = false
  }
}

/** Retry si erreur */
function handleRetry() {
  hasError.value = null
  void handleReload()
}

/** Raccourci clavier Enter pour valider rapidement (accessibilité + UX) */
function onKeydown(e: KeyboardEvent) {
  if (!store.needRefresh)
    return
  if (e.key === 'Enter' && !isUpdating.value && !hasError.value) {
    e.preventDefault()
    void handleReload()
  }
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Transition name="snack-slide">
    <div
      v-if="store.needRefresh"
      class="pointer-events-none fixed inset-x-0 bottom-0 z-20000 flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom,0)+1rem)]"
      md="pb-[calc(env(safe-area-inset-bottom,0)+1.25rem)]"
    >
      <section
        class="pointer-events-auto max-w-xl w-full rounded-2xl bg-white/85 shadow-xl ring-1 ring-black/5 backdrop-blur-md dark:bg-gray-900/80 dark:ring-white/10"
        role="status"
        :aria-busy="isUpdating"
        aria-live="polite"
      >
        <!-- Contenu -->
        <div class="flex items-center gap-3 px-4 py-3">
          <!-- Icône / Loader -->
          <div class="h-7 w-7 flex items-center justify-center">
            <UiLoader v-if="isUpdating" minimal aria-hidden="true" />
            <span v-else-if="hasError" class="i-carbon:warning-alt text-xl text-red-500 dark:text-red-400" aria-hidden="true" />
            <span v-else class="text-primary-600 i-carbon:upgrade dark:text-primary-300 text-xl" aria-hidden="true" />
          </div>

          <!-- Texte -->
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">
              {{ statusMessage }}
            </p>

            <p v-if="!isUpdating && !hasError" class="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
              {{ t('components.UpdateSnackbar.explain', 'Clique sur “Recharger” pour appliquer la nouvelle version.') }}
            </p>

            <p v-else-if="isUpdating" class="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
              {{ t('components.UpdateSnackbar.explainUpdating', 'Ne ferme pas l’application pendant la mise à jour.') }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <UiButton
              v-if="hasError"
              type="secondary"
              variant="soft"
              data-state="error"
              @click="handleRetry"
            >
              {{ t('components.UpdateSnackbar.retry', 'Réessayer') }}
            </UiButton>

            <UiButton
              v-else
              ref="reloadBtnRef"
              type="primary"
              variant="solid"
              :disabled="isUpdating"
              :aria-disabled="isUpdating"
              :data-state="isUpdating ? 'loading' : 'idle'"
              class="min-w-28"
              @click="handleReload"
            >
              <template v-if="isUpdating">
                {{ t('components.UpdateSnackbar.reloading', 'Rechargement…') }}
              </template>
              <template v-else>
                {{ t('components.UpdateSnackbar.reload', 'Recharger') }}
              </template>
            </UiButton>
          </div>
        </div>

        <!-- Barre de progression indéterminée (affichée uniquement pendant l’update) -->
        <div v-if="isUpdating" class="relative h-1 overflow-hidden rounded-b-2xl">
          <div class="from-primary-600/20 via-primary-600/40 to-primary-600/20 dark:from-primary-400/20 dark:via-primary-400/40 dark:to-primary-400/20 absolute inset-0 bg-gradient-to-r" />
          <div class="bg-primary-600/80 indeterminate-bar dark:bg-primary-400/80 absolute top-0 h-full w-1/3" />
        </div>
      </section>
    </div>
  </Transition>
</template>

<style scoped>
/* Transition douce depuis le bas, sans mouvements agressifs */
.snack-slide-enter-active,
.snack-slide-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}
.snack-slide-enter-from,
.snack-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Barre de progression indéterminée */
@keyframes indeterminate {
  0% {
    transform: translateX(-120%);
  }
  60% {
    transform: translateX(180%);
  }
  100% {
    transform: translateX(180%);
  }
}
.indeterminate-bar {
  animation: indeterminate 1.2s ease-in-out infinite;
}

/* Respect du prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .snack-slide-enter-active,
  .snack-slide-leave-active {
    transition:
      opacity 0.15s linear,
      transform 0.15s linear;
  }
  .indeterminate-bar {
    animation-duration: 2s;
  }
}
</style>
