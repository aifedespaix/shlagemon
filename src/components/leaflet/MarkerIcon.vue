<script setup lang="ts">
/**
 * Icône de marker Leaflet rendue par Vue.
 * - Pas de "any"
 * - Props strictes
 * - Accessible (role="button", tabindex, aria-*)
 */

import { GOLD_FILTER, GREY_FILTER } from '~/utils/iconStyles'

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
  hasKing: boolean
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

type CaptureState = 'missing' | 'complete' | 'perfect' | 'shiny'
const captureState = computed<CaptureState>(() => {
  if (!props.allCaptured)
    return 'missing'
  if (props.allShiny)
    return 'shiny'
  if (props.perfectZone)
    return 'perfect'
  return 'complete'
})

type KingState = 'none' | 'undefeated' | 'defeated'
const kingState = computed<KingState>(() => {
  if (!props.hasKing)
    return 'none'
  return props.kingDefeated ? 'defeated' : 'undefeated'
})

/** Styles calculés pour l'icône principale (cas non-village) */
const zoneIconFilter = computed<string>(() => {
  if (props.zoneType === 'village')
    return ''
  if (captureState.value === 'missing')
    return GREY_FILTER
  if (captureState.value === 'perfect')
    return GOLD_FILTER
  return ''
})

const ballStyle = computed<string>(() => {
  switch (captureState.value) {
    case 'missing':
      return GREY_FILTER
    case 'perfect':
      return GOLD_FILTER
    default:
      return ''
  }
})

const arenaStyle = computed(() =>
  props.arenaCompleted ? GOLD_FILTER : GREY_FILTER,
)

const crownStyle = computed(() =>
  kingState.value === 'defeated' ? GOLD_FILTER : GREY_FILTER,
)

/** Highlight doux pour zones non visitées et non vérouillées */
const pulseClass = computed(() =>
  (!props.visited && !props.locked) ? 'animate-pulse-alt' : '',
)

/** Gestion clavier (accessibilité) */
function onKeydown(e: KeyboardEvent) {
  if (props.locked)
    return
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
    class="flex flex-col select-none items-center"
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
      class="block h-12 w-12"
      :class="pulseClass"
      :style="zoneIconFilter"
      draggable="false"
    >

    <!-- Badges -->
    <div v-if="zoneType === 'village' ? hasArenaPoi : true" class="flex items-center gap-0.5 -mt-1">
      <!-- Village : arène -->
      <template v-if="zoneType === 'village'">
        <div
          v-if="hasArenaPoi"
          class="i-mdi:sword-cross h-3 w-3"
          :style="arenaStyle"
          :aria-label="arenaCompleted ? 'Arena completed' : 'Arena available'"
        />
      </template>

      <!-- Zones sauvages : capture + roi -->
      <template v-else>
        <div class="relative">
          <img
            src="/items/shlageball/shlageball.webp"
            alt=""
            class="h-3 w-3"
            :style="ballStyle"
            draggable="false"
          >
          <div
            v-if="captureState === 'shiny'"
            class="mask-rainbow i-mdi:star absolute h-2 w-2 -right-1 -top-1"
            aria-label="All shiny"
          />
        </div>
        <div
          v-if="kingState !== 'none'"
          class="i-game-icons:queen-crown h-3 w-3"
          :style="crownStyle"
          :aria-label="kingState === 'defeated' ? 'King defeated' : 'King available'"
        />
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
