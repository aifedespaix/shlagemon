<script setup lang="ts">
// Typage fort, future-proof
import { computed } from 'vue'

const { t } = useI18n()

/** Liens supportés, modulaire si tu veux en rajouter */
const SUPPORT_LINKS = [
  {
    key: 'donate',
    icon: 'i-carbon-favorite',
    label: computed(() => t('components.settings.SupportTab.donateLabel')),
    desc: computed(() => t('components.settings.SupportTab.donateDesc')),
    href: 'https://ko-fi.com/aifes',
    color: 'bg-orange-500 hover:bg-orange-600 focus-visible:ring-orange-400',
  },
  {
    key: 'discord',
    icon: 'i-mdi-discord',
    label: computed(() => t('components.settings.SupportTab.discordLabel')),
    desc: computed(() => t('components.settings.SupportTab.discordDesc')),
    href: 'https://discord.gg/TnKdgfxf',
    color: 'bg-[#5865F2] hover:bg-[#4854c0] focus-visible:ring-[#5865F2]',
  },
] as const

function openLink(url: string) {
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <div
    class="mx-auto max-w-sm w-full flex flex-col items-center gap-8 py-4"
    aria-labelledby="support-title"
  >
    <h2 id="support-title" class="sr-only">
      Support
    </h2>
    <ul class="w-full flex flex-col gap-6">
      <li
        v-for="link in SUPPORT_LINKS"
        :key="link.key"
        class="flex flex-col items-center gap-3 rounded-2xl bg-white/5 p-4 shadow-lg transition-all dark:bg-black/10"
      >
        <p class="text-sm text-gray-700 dark:text-gray-300">
          {{ link.desc }}
        </p>
        <button
          type="button"
          class="group flex items-center gap-2 rounded-xl px-5 py-2 text-white font-medium shadow-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-inset"
          :class="link.color"
          :aria-label="link.label"
          @click="openLink(link.href)"
        >
          <span :class="`${link.icon} text-xl transition-transform group-hover:scale-110 group-active:scale-90`" aria-hidden="true" />
          <span>{{ link.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
