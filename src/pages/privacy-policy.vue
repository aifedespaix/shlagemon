<script setup lang="ts">
const { t } = useI18n()
usePageHead({
  title: () => t('pages.privacy-policy.title'),
  description: () => t('pages.privacy-policy.description'),
})
</script>

<template>
  <article class="w-full p-4 prose dark:prose-invert">
    <h1>{{ t('pages.privacy-policy.title') }}</h1>
    <p class="text-sm">
      {{ t('pages.privacy-policy.lastUpdated') }}
    </p>
    <h2>{{ t('pages.privacy-policy.sections.data.title') }}</h2>
    <p>{{ t('pages.privacy-policy.sections.data.content') }}</p>
    <h2>{{ t('pages.privacy-policy.sections.hosting.title') }}</h2>
    <p>{{ t('pages.privacy-policy.sections.hosting.content') }}</p>
    <h2>{{ t('pages.privacy-policy.sections.rights.title') }}</h2>
    <p>{{ t('pages.privacy-policy.sections.rights.content') }}</p>
    <h2>{{ t('pages.privacy-policy.sections.contact.title') }}</h2>
    <p>{{ t('pages.privacy-policy.sections.contact.content') }}</p>
  </article>
</template>
