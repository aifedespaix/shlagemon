/**
 * Reactive helpers to detect PWA or Trusted Web Activity contexts.
 *
 * Exposes installability state and a conservative heuristic to detect
 * Trusted Web Activity (TWA) sessions.
 */
const TWA_PARAM_KEYS = ['twa', 'source', 'app'] as const

type TwaParamKey = (typeof TWA_PARAM_KEYS)[number]

export interface PwaEnvironment {
  /** True when the app runs without browser UI (PWA/TWA/fullscreen). */
  readonly isStandalone: Readonly<Ref<boolean>>
  /** True when the browser considers the app installable. */
  readonly isInstallable: Readonly<Ref<boolean>>
  /** True immediately after installation. */
  readonly isInstalledNow: Readonly<Ref<boolean>>
  /** Heuristic signal to detect a Trusted Web Activity. */
  readonly isTwa: ComputedRef<boolean>
}

/**
 * Detects PWA and TWA execution environments.
 */
export function usePwaEnvironment(): PwaEnvironment {
  // 1) Standalone (Chrome/Edge) + iOS Safari
  const matchesStandalone = useMediaQuery('(display-mode: standalone)')
  const matchesFullscreen = useMediaQuery('(display-mode: fullscreen)')
  const isIosStandalone = ref<boolean>(
    typeof navigator !== 'undefined'
    && (navigator as unknown as { standalone?: boolean }).standalone === true,
  )
  const isStandalone = computed(() =>
    matchesStandalone.value || matchesFullscreen.value || isIosStandalone.value,
  )

  // 2) Installable / Installed
  const isInstallable = ref(false)
  const isInstalledNow = ref(false)
  if (typeof window !== 'undefined') {
    useEventListener(window, 'beforeinstallprompt', () => {
      isInstallable.value = true
    })
    useEventListener(window, 'appinstalled', () => {
      isInstalledNow.value = true
      isInstallable.value = false
    })
  }

  // 3) TWA: signal via query param or heuristics
  const params: Record<string, unknown> = typeof window === 'undefined'
    ? reactive({})
    : useUrlSearchParams<'history' | 'hash' | 'hash-params'>(
        'history',
        { removeNullishValues: true },
      )
  const ua = ref(
    typeof navigator !== 'undefined' ? navigator.userAgent : '',
  ) // Client: reactive UA

  const uaLooksAndroidChrome = computed(() =>
    /Android/i.test(ua.value) && /Chrome\/\d+/i.test(ua.value),
  )

  // Explicit signal ?twa=1 or ?source=twa etc.
  const twaSignalParam = computed(() =>
    TWA_PARAM_KEYS.some((k: TwaParamKey) => {
      const value = String(params[k] ?? '').toLowerCase()
      return value === 'twa' || value === '1'
    }),
  )

  const isTwa = computed(() =>
    twaSignalParam.value || (isStandalone.value && uaLooksAndroidChrome.value),
  )

  return {
    isStandalone: readonly(isStandalone),
    isInstallable: readonly(isInstallable),
    isInstalledNow: readonly(isInstalledNow),
    isTwa,
  }
}
