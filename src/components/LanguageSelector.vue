<script setup lang="ts">
import type { Locale } from 'vue-i18n'
import { availableLocales } from '~/constants/locales'

const router = useRouter()
const { switchLang } = useLangSwitch()

const { locale, t } = useI18n()

const options = computed(() => availableLocales.map(l => ({
  label: t(`components.LanguageSelector.${l}`),
  value: l,
})))

async function change(val: string | number) {
  const lang = val as Locale
  const path = await switchLang(lang)
  if (path)
    router.push(path)
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
