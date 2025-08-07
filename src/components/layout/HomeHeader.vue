<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { localizedRoutes } from '~/router/localizedRoutes'

const { t } = useI18n()
const { locale } = storeToRefs(useLocaleStore())

type RouteKey = 'home' | 'shlagedex'

/**
 * Resolve the localized path for a given base route name.
 *
 * @param key Base route name without the locale prefix.
 * @returns Path matching the current locale or the root path if unresolved.
 */
function localizedPath(key: RouteKey): string {
  const entry = localizedRoutes.find(route => route.name === key)
  return entry?.paths[locale.value] ?? '/'
}
</script>

<template>
  <header class="flex items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
    <RouterLink :to="localizedPath('home')" class="flex items-center gap-2">
      <img src="/logo.webp" :alt="t('components.layout.HomeHeader.logoAlt')" class="h-8 w-auto">
      <span class="font-bold">{{ t('components.layout.HomeHeader.title') }}</span>
    </RouterLink>
    <nav class="hidden gap-4 md:flex">
      <RouterLink :to="localizedPath('home')" class="hover:underline">
        {{ t('components.layout.HomeHeader.home') }}
      </RouterLink>
      <RouterLink :to="localizedPath('shlagedex')" class="hover:underline">
        {{ t('components.layout.HomeHeader.dex') }}
      </RouterLink>
    </nav>
    <ThemeToggle />
  </header>
</template>
