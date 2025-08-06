<script setup lang="ts">
// Typage strict et extensible
import { computed } from 'vue'

const { t } = useI18n()

/**
 * Enum des types de support
 */
const enum SupportLinkKey {
  Donate = 'donate',
  Discord = 'discord',
  Youtube = 'youtube',
}

interface SupportLink {
  readonly key: SupportLinkKey
  readonly icon: string
  readonly label: Readonly<ReturnType<typeof computed>>
  readonly desc: Readonly<ReturnType<typeof computed>>
  readonly href: string
  readonly color: string
}

const SUPPORT_LINKS = [
  {
    key: SupportLinkKey.Donate,
    icon: 'i-carbon-favorite',
    label: computed(() => t('components.settings.SupportTab.donateLabel')),
    desc: computed(() => t('components.settings.SupportTab.donateDesc')),
    href: 'https://ko-fi.com/aifes',
    color: 'bg-orange-500 hover:bg-orange-600 focus-visible:ring-orange-400',
  },
  {
    key: SupportLinkKey.Discord,
    icon: 'i-mdi-discord',
    label: computed(() => t('components.settings.SupportTab.discordLabel')),
    desc: computed(() => t('components.settings.SupportTab.discordDesc')),
    href: 'https://discord.gg/TnKdgfxf',
    color: 'bg-[#5865F2] hover:bg-[#4854c0] focus-visible:ring-[#5865F2]',
  },
  {
    key: SupportLinkKey.Youtube,
    icon: 'i-mdi-youtube',
    label: computed(() => t('components.settings.SupportTab.youtubeLabel')),
    desc: computed(() => t('components.settings.SupportTab.youtubeDesc')),
    href: 'https://www.youtube.com/playlist?list=PL6EUPPQAaktVTKmJ64SV4tkcPLqE-Wm2f',
    color: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500',
  },
] as const satisfies readonly SupportLink[]

/**
 * Ouvre le lien dans un nouvel onglet, sécurisé
 */
function openLink(url: string) {
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <div
    class="mx-auto max-w-sm w-full flex flex-col items-center gap-8 py-4"
    aria-labelledby="support-title"
  >
    <h3 id="support-title" class="text-center text-lg font-bold">
      {{ t('components.settings.SettingsModal.tabs.support') }}
    </h3>
    <ul class="w-full flex flex-col gap-6">
      <li
        v-for="link in SUPPORT_LINKS"
        :key="link.key"
        class="flex flex-col items-center gap-3 rounded-2xl bg-white/5 p-4 shadow-lg transition-all dark:bg-black/10"
      >
        <p class="text-sm text-gray-700 dark:text-gray-300 text-center">
          {{ link.desc }}
        </p>
        <button
          type="button"
          class="group flex items-center gap-2 rounded-xl px-5 py-2 text-white font-medium shadow-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-inset"
          :class="link.color"
          :aria-label="link.label"
          @click="openLink(link.href)"
        >
          <span
            :class="`${link.icon} text-xl transition-transform group-hover:scale-110 group-active:scale-90`"
            aria-hidden="true"
          />
          <span>{{ link.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
