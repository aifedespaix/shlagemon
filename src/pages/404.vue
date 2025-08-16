<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

/** Titre + focale + SEO noindex pour une 404 SPA. */
const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
usePageHead({
  title: () => t('pages.404.title'),
  description: () => t('pages.404.description'),
})
useHead({ meta: [{ name: 'robots', content: 'noindex' }] })

const h1Ref = ref<HTMLHeadingElement | null>(null)
const copied = ref(false)
const copyError = ref<string | null>(null)

const attemptedPath = computed<string>(() => String(route.fullPath ?? route.path ?? '/'))

/** Conserve la locale si la route commence par /fr ou /en, sinon on tente depuis i18n, sinon '/'. */
const homePath = computed<string>(() => {
  const m = /^\/(fr|en)(?=\/|$)/.exec(attemptedPath.value)
  if (m)
    return `/${m[1]}`
  const loc = String(locale?.value ?? '')
  return loc === 'fr' || loc === 'en' ? `/${loc}` : '/'
})

/** Mailto (modifiable) avec détails utiles déjà préremplis. */
const mailtoHref = computed<string>(() => {
  const subject = encodeURIComponent('404 report')
  const body = encodeURIComponent([
    `URL: ${location.href}`,
    `Referrer: ${document.referrer || '—'}`,
    `User-Agent: ${navigator.userAgent}`,
    `Time: ${new Date().toISOString()}`,
  ].join('\n'))
  // Remplace l’adresse par la tienne si besoin
  return `mailto:aife.contacts@gmail.com?subject=${subject}&body=${body}`
})

const debugText = computed<string>(() => [
  `=== 404 Debug ===`,
  `URL: ${location.href}`,
  `Path: ${attemptedPath.value}`,
  `Referrer: ${document.referrer || '—'}`,
  `User-Agent: ${navigator.userAgent}`,
  `Time: ${new Date().toISOString()}`,
].join('\n'))

function goHome(): void {
  router.push(homePath.value).catch(() => {})
}
function goBack(): void {
  if (history.length > 1)
    router.back()
  else goHome()
}
async function copyDebug(): Promise<void> {
  copyError.value = null
  try {
    await navigator.clipboard.writeText(debugText.value)
    copied.value = true
    // Reset state après un petit délai
    window.setTimeout(() => {
      copied.value = false
    }, 1500)
  }
  catch (err) {
    copyError.value = err instanceof Error ? err.message : 'Copy failed'
  }
}

onMounted(() => {
  // Focus accessible
  // petit timeout pour laisser le DOM/transition se stabiliser
  window.setTimeout(() => h1Ref.value?.focus(), 0)
  // Raccourcis clavier utiles
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

function onKeydown(e: KeyboardEvent): void {
  // h → home, b → back
  if (e.key === 'h' || e.key === 'H') {
    e.preventDefault()
    goHome()
  }
  else if (e.key === 'b' || e.key === 'B') {
    e.preventDefault()
    goBack()
  }
}
</script>

<template>
  <main
    role="main"
    class="mx-auto max-w-3xl p-6 sm:p-8"
    aria-labelledby="notfound-title"
  >
    <section
      class="border border-gray-200/60 rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-10"
    >
      <!-- Bloc visuel -->
      <div class="flex items-center gap-4 sm:gap-6">
        <!-- Badge 404 décoratif -->
        <div
          class="select-none rounded-xl from-pink-500 to-sky-500 bg-gradient-to-br px-3 py-2 text-white shadow-md sm:px-4 sm:py-3"
          aria-hidden="true"
        >
          <span class="block text-2xl font-extrabold tracking-tight lg:text-4xl sm:text-3xl">
            404
          </span>
        </div>

        <!-- Titre / message -->
        <div class="min-w-0">
          <h1
            id="notfound-title"
            ref="h1Ref"
            tabindex="-1"
            class="text-balance text-2xl text-gray-900 font-bold leading-tight lg:text-4xl sm:text-3xl dark:text-gray-100"
          >
            {{ t?.('pages.404.title') ?? 'Page introuvable' }}
          </h1>
          <p class="mt-2 text-pretty text-sm text-gray-600 sm:text-base dark:text-gray-300">
            {{ t?.('pages.404.description') ?? "La page que vous cherchez n'existe pas, a été déplacée ou l'URL contient une coquille." }}
          </p>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span class="font-medium">URL&nbsp;:</span>
            <code class="break-all rounded px-1.5 py-0.5 text-[0.8em] text-gray-800 dark:text-gray-200">{{ attemptedPath }}</code>
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
        <button
          type="button"
          class="inline-flex items-center gap-2 border border-transparent rounded-xl bg-gray-900 px-4 py-2 text-sm text-white font-medium shadow transition-all hover:translate-y--0.5 dark:bg-white dark:text-gray-900 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
          data-testid="btn-home"
          @click="goHome"
        >
          <!-- home icon -->
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3.172 2 12h3v8h6v-6h2v6h6v-8h3L12 3.172z" />
          </svg>
          {{ t('pages.404.goHome') }}
          <span class="sr-only">(H)</span>
        </button>

        <button
          type="button"
          class="inline-flex items-center gap-2 border border-gray-300 rounded-xl bg-white px-4 py-2 text-sm text-gray-800 font-medium shadow-sm transition-all hover:translate-y--0.5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
          data-testid="btn-back"
          @click="goBack"
        >
          <!-- back icon -->
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M11 19 2 12l9-7v5h11v4H11v5z" />
          </svg>
          {{ t?.('pages.404.goBack') ?? 'Revenir en arrière' }}
          <span class="sr-only">(B)</span>
        </button>

        <button
          type="button"
          class="inline-flex items-center gap-2 border border-gray-300 rounded-xl bg-white px-4 py-2 text-sm text-gray-800 font-medium shadow-sm transition-all hover:translate-y--0.5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
          :aria-pressed="copied ? 'true' : 'false'"
          :title="t?.('pages.404.copyTitle') ?? 'Copier les détails (URL, UA...)'"
          data-testid="btn-copy"
          @click="copyDebug"
        >
          <!-- copy icon -->
          <svg v-if="!copied" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 7V5a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2h-1v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h8V5H10v2H8zm2 4h8v8H10v-8z" />
          </svg>
          <!-- check icon -->
          <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
          <span>
            {{ copied ? (t?.('pages.404.copied') ?? 'Copié !') : (t?.('pages.404.copy') ?? 'Copier les détails') }}
          </span>
        </button>

        <a
          :href="mailtoHref"
          class="inline-flex items-center gap-2 border border-transparent rounded-xl from-pink-500 to-sky-500 bg-gradient-to-r px-4 py-2 text-sm text-white font-medium shadow transition-all hover:translate-y--0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
          data-testid="btn-report"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 4H4a2 2 0 0 0-2 2v.8l10 6.2 10-6.2V6a2 2 0 0 0-2-2zm0 4.3-8.6 5.3a1 1 0 0 1-1 0L4 8.3V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.3z" />
          </svg>
          {{ t('pages.404.report') }}
        </a>
      </div>

      <!-- Zone d’état (copie, erreurs) -->
      <p
        v-if="copyError"
        class="mt-3 text-sm text-red-600 dark:text-red-400"
        role="alert"
        aria-live="polite"
      >
        {{ copyError }}
      </p>

      <!-- Astuces -->
      <div class="mt-6 text-xs text-gray-500 dark:text-gray-400">
        <p>
          {{ t?.('pages.404.hint') ?? 'Astuce : appuyez sur H pour l’accueil, B pour revenir en arrière.' }}
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Petites attentions d’animation non intrusives */
@media (prefers-reduced-motion: no-preference) {
  [data-testid='btn-home'],
  [data-testid='btn-back'],
  [data-testid='btn-copy'],
  [data-testid='btn-report'] {
    transition-property: transform, box-shadow, background-color, border-color;
    transition-duration: 150ms;
  }
}
</style>
