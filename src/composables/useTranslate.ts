export function useTranslate() {
  const { t, te } = useI18n()

  function translate(key: string, params?: Record<string, unknown>): string {
    const resolved: Record<string, unknown> = {}
    if (params) {
      for (const [name, value] of Object.entries(params)) {
        resolved[name] = typeof value === 'string' && te(value) ? t(value) : value
      }
    }
    return te(key) ? t(key, resolved) : key
  }

  return { translate }
}

export type TranslateFn = ReturnType<typeof useTranslate>['translate']
