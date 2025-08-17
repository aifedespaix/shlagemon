<script setup lang="ts">
import { getZoneTrack } from '~/data/music'

const { t } = useI18n()
usePageHead({
  title: () => t('pages.index.title'),
  description: () => t('pages.index.description'),
})
const app = useAppStore()
useEggStore()
useDojoStore()
useBreedingStore()

/**
 * Starts playing the current zone's music if music is enabled and nothing is playing.
 */
function initializeAudio(): void {
  const audio = useAudioStore()
  const zone = useZoneStore()
  if (!audio.isMusicEnabled || audio.currentMusic)
    return

  const track = getZoneTrack(zone.current.id, zone.current.type)
  if (track)
    audio.fadeToMusic(track)
}

/**
 * Synchronizes the badge box with the player's earned badges.
 */
function hydrateBadgeBox(): void {
  const badgeBox = useBadgeBoxStore()
  badgeBox.syncWithPlayerBadges()
}

onMounted(() => {
  initializeAudio()
  hydrateBadgeBox()
})
</script>

<template>
  <div id="game" class="relative h-full flex flex-col animate-fade-in select-none overflow-hidden">
    <LayoutHeader />
    <LayoutGameGrid class="flex-1" />
    <LayoutMobileMenu />
    <UpdateSnackbar />
    <Loader v-if="!app.isReady" />
  </div>
</template>
