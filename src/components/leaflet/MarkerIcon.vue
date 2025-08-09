<script setup lang="ts">
/**
 * Icône de marker Leaflet rendue par Vue.
 * - Pas de "any"
 * - Props strictes
 * - Accessible (role="button", tabindex, aria-*)
 */

type ZoneType = 'village' | 'zone'
interface Props {
  /** Type de la zone (affecte l’icône et les badges) */
  zoneType: ZoneType
  /** URL de l’icône principale */
  zoneIconSrc: string
  /** Titre (tooltip natif Leaflet) et aria-label */
  title: string

  /** États de progression */
  visited: boolean
  locked: boolean
  allCaptured: boolean
  perfectZone: boolean
  allShiny: boolean
  kingDefeated: boolean
  arenaCompleted: boolean
  hasArenaPoi: boolean

  /** Taille & ancrage (hérités de l’icône Leaflet) */
  iconSize: number
  anchorY: number

  /** Callback click (Leaflet émettra aussi, mais utile pour clavier) */
  onSelect?: () => void
}

const props = defineProps<Props>()

/** Styles calculés pour l'icône principale (cas non-village) */
const zoneIconFilter = computed<string>(() => {
  if (props.zoneType === 'village')
    return ''
  if (!props.allCaptured)
    return 'filter:grayscale(1) opacity(0.9);'
  if (props.perfectZone)
    return 'filter:brightness(1.08) drop-shadow(0 0 2px #facc15) drop-shadow(0 0 4px #facc15) drop-shadow(0 0 6px #facc15);'
  return ''
})

/** Highlight doux pour zones non visitées et non vérouillées */
const pulseClass = computed(() =>
  (!props.visited && !props.locked) ? 'animate-pulse-alt' : '',
)

/** Gestion clavier (accessibilité) */
function onKeydown(e: KeyboardEvent) {
  if (props.locked) return
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    props.onSelect?.()
  }
}
</script>

<template>
  <!--
    Wrapper : on respecte la taille/anchor côté Leaflet.
    Ici côté Vue on se concentre sur le contenu et les états.
  -->
  <div
    class="flex flex-col items-center select-none"
    :class="locked ? 'grayscale opacity-50' : ''"
    role="button"
    :aria-label="title"
    :aria-disabled="locked ? 'true' : 'false'"
    tabindex="0"
    @keydown="onKeydown"
    @click="!locked && onSelect?.()"
  >
    <!-- Icône principale -->
    <img
      :src="zoneIconSrc"
      :alt="title"
      class="block"
      :class="[`w-12 h-12`, pulseClass]"
      :style="zoneIconFilter"
      draggable="false"
    />

    <!-- Badges -->
    <div
      v-if="zoneType === 'village' || true /* conditionnera plus bas */"
      class="flex gap-0.5 -mt-1 items-center"
    >
      <!-- Village : couronne + arène -->
      <template v-if="zoneType === 'village'">
        <div v-if="kingDefeated" class="i-game-icons:crown h-3 w-3" aria-label="King defeated" />
        <div
          v-if="arenaCompleted || hasArenaPoi"
          :class="['i-mdi:sword-cross h-3 w-3', arenaCompleted ? '' : 'opacity-50 grayscale']"
          :aria-label="arenaCompleted ? 'Arena completed' : 'Arena available'"
        />
      </template>

      <!-- Non-village : balle + shiny -->
      <template v-else>
        <div class="relative">
          <img
            src="/items/shlageball/shlageball.webp"
            alt=""
            class="h-3 w-3"
            :style="!allCaptured
              ? 'filter:grayscale(1) opacity(0.9);'
              : (perfectZone
                ? 'filter:brightness(1.08) drop-shadow(0 0 2px #facc15) drop-shadow(0 0 4px #facc15) drop-shadow(0 0 6px #facc15);'
                : '')"
            draggable="false"
          />
          <div
            v-if="allShiny"
            class="i-mdi:star h-2 w-2 mask-rainbow absolute -top-1 -right-1"
            aria-label="All shiny"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Optionnel : focus visible clean */
:focus-visible {
  outline: 2px solid #38bdf8; /* sky-400 */
  outline-offset: 2px;
  border-radius: 9999px;
}
</style>
