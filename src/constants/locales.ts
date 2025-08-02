export type Locale = 'fr' | 'en'

/**
 * List of supported locale codes.
 *
 * Declared as `readonly` to prevent mutation at runtime
 * and typed with `Locale` to ensure consistency across the app.
 */
export const availableLocales: readonly Locale[] = ['fr', 'en']

/** Default locale used when the user's preference is unknown. */
export const defaultLocale: Locale = 'en'
