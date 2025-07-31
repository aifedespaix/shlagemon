<script setup lang="ts">
const { t } = useI18n()

function openKofi() {
  window.open('https://ko-fi.com/aifes', '_blank')
}

function openDiscord() {
  window.open('https://discord.gg/TnKdgfxf', '_blank')
}
</script>

<template>
  <div class="flex flex-col items-center gap-6 text-center">
    <section class="flex flex-col items-center gap-2">
      <p class="text-sm">
        {{ t('components.settings.SupportTab.donateDesc') }}
      </p>
      <UiButton class="flex items-center gap-1" @click="openKofi">
        <div class="i-carbon-favorite" />
        {{ t('components.settings.SupportTab.donateLabel') }}
      </UiButton>
    </section>
    <section class="flex flex-col items-center gap-2">
      <p class="text-sm">
        {{ t('components.settings.SupportTab.discordDesc') }}
      </p>
      <UiButton
        class="flex items-center gap-1 bg-[#5865F2] text-white hover:bg-[#4854c0]"
        @click="openDiscord"
      >
        <div class="i-mdi-discord" />
        {{ t('components.settings.SupportTab.discordLabel') }}
      </UiButton>
    </section>
  </div>
</template>
