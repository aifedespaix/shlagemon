export const availableLocales = ['fr', 'en'] as const
export type Locale = typeof availableLocales[number]
export const defaultLocale: Locale = 'en'
