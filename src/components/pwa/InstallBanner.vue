<script setup lang="ts">
/**
 * Bandeau PWA "Installer l’app".
 * - Chromium: écoute `beforeinstallprompt` et déclenche `prompt()`.
 * - iOS: pas de BIP -> affiche un bouton "Comment ?" avec instructions.
 * - N’affiche rien si déjà installé (display-mode: standalone / navigator.standalone).
 * - Mémorise "Plus tard" dans localStorage (cooldown configurable).
 */
import { useEventListener, useLocalStorage, useMediaQuery } from '@vueuse/core'
import { toast } from 'vue3-toastify'

interface Props {
  dismissCooldownDays?: number
  dismissStorageKey?: string
  forceIOSInstructions?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  dismissCooldownDays: 7,
  dismissStorageKey: 'pwa-install-dismissed-at',
  forceIOSInstructions: false,
})

const { t } = useI18n()
type InstallOutcome = 'accepted' | 'dismissed' | 'unavailable'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>
}

const deferred = ref<BeforeInstallPromptEvent | null>(null)
const isStandaloneMq = useMediaQuery('(display-mode: standalone)')
const dismissedAt = useLocalStorage<number | null>(props.dismissStorageKey, null)

const isIOSStandalone = computed<boolean>(() => {
  return typeof navigator !== 'undefined' && !!(navigator as any).standalone
})

const isIOS = computed<boolean>(() => {
  if (props.forceIOSInstructions)
    return true
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent || ''
  return /iPhone|iPad|iPod/i.test(ua)
})

const isInstalled = computed<boolean>(() => isStandaloneMq.value || isIOSStandalone.value)

const dismissedRecently = computed<boolean>(() => {
  if (!dismissedAt.value)
    return false
  const ms = props.dismissCooldownDays * 24 * 60 * 60 * 1000
  return Date.now() - dismissedAt.value < ms
})

const canPrompt = computed<boolean>(() => !!deferred.value && !isInstalled.value && !dismissedRecently.value)
const shouldShowIOS = computed<boolean>(() => isIOS.value && !isInstalled.value && !dismissedRecently.value)
const visible = computed<boolean>(() => (canPrompt.value || shouldShowIOS.value))

async function promptInstall(): Promise<InstallOutcome> {
  const e = deferred.value
  if (!e)
    return 'unavailable'
  deferred.value = null
  try {
    await e.prompt()
    const choice = await e.userChoice
    return choice.outcome
  }
  catch {
    return 'dismissed'
  }
}

function dismissBanner() {
  dismissedAt.value = Date.now()
}

function showIOSHelp() {
  toast(t('components.pwa.InstallBanner.ios_instructions'))
}

if (typeof window !== 'undefined') {
  useEventListener(window, 'beforeinstallprompt', (ev: Event) => {
    ev.preventDefault?.()
    deferred.value = ev as BeforeInstallPromptEvent
  }, { passive: true })

  useEventListener(window, 'appinstalled', () => {
    deferred.value = null
  }, { passive: true })
}
</script>

<template>
  <transition name="pwa-slide-up">
    <div
      v-if="visible"
      role="dialog"
      aria-live="polite"
      class="fixed inset-x-0 bottom-0 z-2000 mx-auto max-w-[920px] px-3 pb-[env(safe-area-inset-bottom)]"
    >
      <div
        class="flex items-center gap-3 border border-neutral-700/40 rounded-2xl bg-neutral-900/90 p-3 text-neutral-100 shadow-lg backdrop-blur md:p-4"
      >
        <div class="i-carbon-install shrink-0 text-xl md:text-2xl" aria-hidden="true" />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium md:text-base">
            {{ t('components.pwa.InstallBanner.title') }}
          </p>
          <p class="text-xs text-neutral-300 md:text-sm">
            <span v-if="canPrompt">
              {{ t('components.pwa.InstallBanner.chromium_hint') }}
            </span>
            <span v-else>
              {{ t('components.pwa.InstallBanner.ios_hint') }}
            </span>
          </p>
        </div>

        <div class="flex gap-2">
          <UiButton
            size="xs"
            variant="outline"
            class="text-neutral-300 hover:text-white"
            @click="dismissBanner"
          >
            {{ t('components.pwa.InstallBanner.later') }}
          </UiButton>

          <UiButton
            size="xs"
            class="bg-primary-600 hover:bg-primary-500 text-white"
            @click="canPrompt ? (async () => { await promptInstall() })() : showIOSHelp()"
          >
            {{ canPrompt ? t('components.pwa.InstallBanner.install') : t('components.pwa.InstallBanner.how') }}
          </UiButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.pwa-slide-up-enter-active,
.pwa-slide-up-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.pwa-slide-up-enter-from,
.pwa-slide-up-leave-to {
  transform: translateY(12px);
  opacity: 0;
}
</style>
