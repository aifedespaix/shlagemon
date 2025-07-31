<script setup lang="ts">
import type { Locale } from 'vue-i18n'
import { availableLocales } from '~/constants/locales'
import { loadLanguageAsync } from '~/modules/i18n'

const { locale, t } = useI18n()
const store = useLocaleStore()

const options = computed(() => availableLocales.map(l => ({
  label: t(`components.LanguageSelector.${l}`),
  value: l,
})))

async function change(val: string | number) {
  const lang = val as Locale
  store.setLocale(lang as Locale)
  await loadLanguageAsync(lang)
}
</script>

<template>
  <div class="h-50 w-full">
    <UiSelectOption
      class="w-24"
      :aria-label="t('components.LanguageSelector.label')"
      :model-value="locale"
      :options="options"
      @update:model-value="change"
    />
  </div>
</template>
