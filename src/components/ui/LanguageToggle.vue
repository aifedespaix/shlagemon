<script setup lang="ts">
const { locale, t } = useI18n()
const router = useRouter()
const { switchLang } = useLangSwitch()

const nextLocale = computed(() => (locale.value === 'fr' ? 'en' : 'fr'))

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
