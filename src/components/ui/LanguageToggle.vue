<script setup lang="ts">
import type { Locale } from '~/constants/locales'
import { availableLocales } from '~/constants/locales'

const { locale, t } = useI18n()
const router = useRouter()
const { switchLang } = useLangSwitch()

const nextLocale = computed(() => {
  const index = availableLocales.indexOf(locale.value as Locale)
  const next = (index + 1) % availableLocales.length
  return availableLocales[next]
})

async function toggle() {
  const path = await switchLang(nextLocale.value)
  if (path)
    router.push(path)
}
</script>

<template>
  <UiButton
    type="icon"
    size="xs"
    :aria-label="t('components.ui.LanguageToggle.label')"
    @click="toggle"
  >
    <div class="i-carbon-language" />
  </UiButton>
</template>
