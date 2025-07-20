<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'
import { useLocaleStore } from '~/stores/locale'

const { locale, t } = useI18n()
const store = useLocaleStore()

const options = computed(() => availableLocales.map(l => ({
  label: t(`components.LanguageSelector.${l}`),
  value: l,
})))

async function change(val: string | number) {
  const lang = val as string
  store.setLocale(lang as 'en' | 'fr')
  await loadLanguageAsync(lang)
}
</script>

<template>
  <UiSelectOption
    class="w-24"
    :aria-label="t('components.LanguageSelector.label')"
    :model-value="locale"
    :options="options"
    @update:model-value="change"
  />
</template>
