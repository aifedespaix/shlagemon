<script setup lang="ts">
import type { ActiveEffect } from '~/type/effect'
import type { DexShlagemon } from '~/type/shlagemon'
import { allItems } from '~/data/items'
import { useDexDetailModalStore } from '~/stores/dexDetailModal'
import { useDexInfoModalStore } from '~/stores/dexInfoModal'
import DiseaseBadge from './DiseaseBadge.vue'
import EffectBadge from './EffectBadge.vue'

/** === Props/Emits ======================================================= */
interface Props {
  mon: DexShlagemon
  hp: number
  color?: string
  flipped?: boolean
  fainted?: boolean
  flash?: boolean
  levelPosition?: 'top' | 'bottom'
  showBall?: boolean
  owned?: boolean
  /** Si contrôlé par le joueur, on ouvre le détail plutôt que le dex. */
  belongsToPlayer?: boolean
  effects?: ActiveEffect[]
  disease?: boolean
  diseaseRemaining?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: undefined,
  flipped: false,
  fainted: false,
  flash: false,
  levelPosition: 'bottom',
  showBall: false,
  owned: false,
  belongsToPlayer: false,
  effects: () => [],
  disease: false,
  diseaseRemaining: 0,
})

const emit = defineEmits<{ (e: 'faintEnd'): void }>()
const { t } = useI18n()
const typeChart = useTypeChartModalStore()
const dex = useShlagedexStore()
const infoModal = useDexInfoModalStore()
const detailModal = useDexDetailModalStore()

/** === Timers ============================================================ */
const now = ref(Date.now())
const { pause: stopTimer } = useIntervalFn(
  () => {
    now.value = Date.now()
  },
  1000,
)
onUnmounted(stopTimer)

/** === Anim "level up" =================================================== */
const lvlUp = ref(false)
const { start: hideLvlUp } = useTimeoutFn(() => (lvlUp.value = false), 600, { immediate: false })
watch(() => props.mon.lvl, (val, old) => {
  if (val > old) {
    lvlUp.value = true
    hideLvlUp()
  }
})

/** === Visibilité document -> fin d’anim faint =========================== */
const documentVisibility = useDocumentVisibility()
watch(() => props.fainted, (fainted) => {
  if (fainted && documentVisibility.value === 'hidden')
    emit('faintEnd')
})
watch(documentVisibility, (state) => {
  if (state === 'hidden' && props.fainted)
    emit('faintEnd')
})
function onAnimationEnd() {
  if (props.fainted)
    emit('faintEnd')
}

/** === Actions UI ======================================================== */
function showTypeChart() {
  const type = props.mon.base.types[0]
  if (type)
    typeChart.open(type.id)
}
function openInfo() {
  if (props.belongsToPlayer)
    detailModal.open(props.mon)
  else infoModal.open(props.mon)
}

/** === Données =========================================================== */
const maxHp = computed(() => dex.maxHp(props.mon))
const heldItem = computed(() => {
  const id = props.mon.heldItemId
  return id ? allItems.find(i => i.id === id) || null : null
})

/** === Floating numbers (dégâts/soin) ==================================== */
type FloatingKind = 'damage' | 'heal'
interface FloatingNumber {
  readonly id: number
  readonly amount: number
  readonly kind: FloatingKind
  /** déplacement final absolu en px (x,y) depuis l’ancre */
  readonly dx: number
  readonly dy: number
  /** rotation légère pour le style */
  readonly rotation: number
}

const floats = ref<FloatingNumber[]>([])
let floatId = 0

/** -------- Batching raf pour regrouper les variations simultanées ------- */
interface PendingDelta { delta: number }
const pending: PendingDelta[] = []
let flushScheduled = false
// === Visibilité document ==================================================
const isHidden = computed(() => documentVisibility.value === 'hidden')

// Quand l'onglet passe en hidden: on purge tout ce qui pourrait animer
watch(isHidden, (hidden) => {
  if (hidden) {
    pending.splice(0, pending.length) // vide la batch
    floats.value = [] // supprime les chips en cours
  }
})

// Dans ton scheduler: ne programme RIEN si l’onglet est caché
function scheduleFlush() {
  if (flushScheduled || isHidden.value)
    return

  flushScheduled = true
  requestAnimationFrame(() => {
    flushScheduled = false
    if (pending.length === 0)
      return

    const entries = buildBurstEntries(pending.splice(0))
    for (const e of entries) floats.value.push(e)

    // Sécurité temporisée uniquement si visible (sinon inutile)
    if (!isHidden.value) {
      window.setTimeout(() => {
        for (const e of entries) removeFloat(e.id)
      }, 1200)
    }
  })
}

function buildBurstEntries(batch: PendingDelta[]): FloatingNumber[] {
  const results: FloatingNumber[] = []
  const usedDx: number[] = []

  /**
   * Retourne une position horizontale pseudo-aléatoire en évitant les recouvrements.
   * Les positions sont bornées à [-maxHoriz, +maxHoriz].
   */
  function randomDx(width: number, maxHoriz: number): number {
    const minGap = width
    for (let attempt = 0; attempt < 8; attempt++) {
      const candidate = Math.round((Math.random() * 2 - 1) * maxHoriz)
      if (usedDx.every(prev => Math.abs(prev - candidate) > minGap)) {
        usedDx.push(candidate)
        return candidate
      }
    }
    const fallback = Math.round((Math.random() * 2 - 1) * maxHoriz)
    usedDx.push(fallback)
    return fallback
  }

  for (const { delta } of batch) {
    if (delta === 0)
      continue

    const kind: FloatingKind = delta < 0 ? 'damage' : 'heal'
    const amount = Math.abs(delta)

    // Estime la largeur visuelle du texte (en px).
    // (rapide et suffisant : ~8px par chiffre + signe)
    const charCount = String(amount).length + 1 // +1 pour +/-
    const w = Math.max(14, charCount * 8) // largeur mini pour éviter 0
    const maxHoriz = w * 3 // 3x la largeur du texte demandé

    const dx = randomDx(w, maxHoriz)

    // Hauteur : plus l’élément est centré, plus il monte (beau “arc”)
    const centerFactor = 1 - Math.abs(dx) / maxHoriz // 1 au centre, 0 aux bords
    const baseRise = kind === 'heal' ? 54 : 46
    const extraRise = 18 * centerFactor
    const dy = -(baseRise + extraRise + Math.random() * 10)

    // Rotation dépend de la position horizontale : droite -> sens horaire, gauche -> anti-horaire
    const magnitude = 4 + Math.random() * 6
    const rotation = Math.round(magnitude * Math.sign(dx))

    results.push({
      id: ++floatId,
      amount,
      kind,
      dx,
      dy: Math.round(dy),
      rotation,
    })
  }
  return results
}

function removeFloat(id: number) {
  const i = floats.value.findIndex(f => f.id === id)
  if (i !== -1)
    floats.value.splice(i, 1)
}

/** Observe hp et pousse des deltas dans la batch courante */
let lastHp = props.hp
watch(() => props.hp, (next) => {
  const delta = next - lastHp
  lastHp = next
  if (delta === 0)
    return
  pending.push({ delta })
  scheduleFlush()
})
</script>

<template>
  <div
    class="relative h-full flex flex-1 flex-col items-center"
    :class="[{ 'saturate-10 contrast-200': props.disease }, { flash: props.flash }]"
    @contextmenu.prevent="openInfo"
  >
    <slot />

    <!-- Badges d’effets / maladie -->
    <div class="absolute left-0 top-2 z-150 flex flex-col gap-1">
      <EffectBadge
        v-for="e in props.effects"
        :key="e.id"
        :effect="e"
        :now="now"
        @click="showTypeChart"
      />
      <DiseaseBadge v-if="props.disease" :remaining="props.diseaseRemaining" />
    </div>

    <!-- Objet tenu -->
    <InventoryWearableItemIcon
      v-if="heldItem"
      :item="heldItem"
      class="absolute bottom-9 left-0 z-150 h-6 w-6"
    />

    <!-- Bouton info -->
    <UiButton
      v-tooltip="t('components.battle.Shlagemon.infoTooltip')"
      type="icon"
      size="xs"
      class="absolute bottom-12 right-0 z-150"
      :aria-label="t('components.battle.Shlagemon.infoTooltip')"
      @click.stop="openInfo"
    >
      <div i-carbon-information />
    </UiButton>

    <!-- Image -->
    <ShlagemonImage
      :id="props.mon.base.id"
      :alt="t(props.mon.base.name)"
      :shiny="props.mon.isShiny"
      class="min-h-25 flex-1"
      :class="[props.flipped ? '-scale-x-100' : '', { faint: props.fainted }]"
      @animationend="onAnimationEnd"
    />
    <div class="dust" :class="{ active: props.fainted }" />

    <!-- Niveau -->
    <div
      class="absolute left-0 text-sm font-bold"
      :class="[props.levelPosition === 'top' ? 'top-0' : 'bottom-0', { 'lvl-up': lvlUp }]"
    >
      lvl {{ props.mon.lvl }}
    </div>

    <!-- Nom + Floating numbers (au-dessus et traj absolues) -->
    <div class="relative mt-1 flex items-center gap-1">
      <img
        v-if="props.showBall && props.owned"
        v-tooltip="t('components.battle.Shlagemon.ownedTooltip')"
        src="/items/shlageball/shlageball.webp"
        alt="ball"
        class="h-4 w-4"
      >
      <span class="font-bold" :class="{ 'shiny-text': props.mon.isShiny }">
        {{ t(props.mon.base.name) }}
      </span>

      <!-- Conteneur ancré au pseudo -->
      <div class="pointer-events-none absolute left-1/2 z-160 h-0 w-0 -top-4 -translate-x-1/2">
        <TransitionGroup
          name="float-dmg"
          tag="div"
          class="relative"
          aria-live="polite"
          :css="!isHidden"
        >
          <div
            v-for="f in floats"
            :key="f.id"
            class="float-chip select-none text-center text-sm font-extrabold drop-shadow"
            :class="[f.kind === 'damage' ? 'text-red-500' : 'text-green-500']"
            :style="{ '--dx': `${f.dx}px`, '--dy': `${f.dy}px`, '--rot': `${f.rotation}deg` } as any"
            @animationend="removeFloat(f.id)"
          >
            {{ f.kind === 'damage' ? '-' : '+' }}{{ f.amount.toLocaleString() }}
          </div>
        </TransitionGroup>

        <!-- SR invisible -->
        <span class="sr-only">
          <template v-for="f in floats" :key="`sr-${f.id}`">
            {{ f.kind === 'damage'
              ? t('components.battle.damageTaken', { amount: f.amount })
              : t('components.battle.healedFor', { amount: f.amount })
            }}
          </template>
        </span>
      </div>
    </div>

    <!-- Barre HP -->
    <UiProgressBar
      :value="props.hp"
      :max="maxHp"
      :color="props.color"
      class="mt-1 w-24"
      :class="{ flash: props.flash }"
    />
    <div class="w-full text-right text-sm">
      <UiAnimatedNumber :value="props.hp" /> / {{ maxHp.toLocaleString() }}
    </div>
  </div>
</template>

<style scoped>
/* === Animations existantes ============================================= */
.faint {
  animation: faint 0.6s ease forwards;
}
.dust {
  @apply absolute left-1/2 bottom-0 h-2 w-8 pointer-events-none opacity-0;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4), transparent);
  transform: translateX(-50%) scale(0.5);
}
.dust.active {
  animation: dust 0.6s forwards;
}
.lvl-up {
  animation: lvl-up 0.6s ease;
}

@keyframes faint {
  to {
    transform: scale(0);
    opacity: 0;
  }
}
@keyframes dust {
  0% {
    opacity: 0.6;
    transform: translateX(-50%) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) scale(1.5);
  }
}
@keyframes lvl-up {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}

/* Chaque chip est absolue pour ne pas impacter le layout */
.float-chip {
  position: absolute; /* <-- clé */
  left: 0;
  top: 0;
  filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.25));
  white-space: nowrap;
  transform: translate(0, 0) rotate(var(--rot, 0deg));
}

/* ---- Floating numbers: montée + fade, sans retour ---- */
.float-dmg-enter-active {
  animation: floatRise 0.9s cubic-bezier(0.22, 0.8, 0.22, 0.99) both;
}

/* on neutralise toute leave, car on supprime à la fin de l'enter */
.float-dmg-leave-active,
.float-dmg-leave-from,
.float-dmg-leave-to {
  animation: none !important;
  transition: none !important;
  opacity: 0 !important;
}

/* point de départ transparent */
.float-dmg-enter-from {
  opacity: 0;
}

@keyframes floatRise {
  /* départ sur l’ancre */
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.95) rotate(var(--rot, 0deg));
    filter: blur(0.3px);
  }
  /* devient lisible rapidement, sans overshoot */
  20% {
    opacity: 1;
    transform: translate(calc(var(--dx) * 0.2), calc(var(--dy) * 0.2)) scale(1) rotate(var(--rot, 0deg));
    filter: blur(0);
  }
  /* avance régulièrement vers la cible en s’estompant */
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--rot, 0deg));
  }
}

/* Accessibilité */
@media (prefers-reduced-motion: reduce) {
  .float-dmg-enter-active {
    animation-duration: 0.3s;
  }
  @keyframes floatRise {
    0% {
      opacity: 0;
      transform: translate(0, 0);
    }
    100% {
      opacity: 1;
      transform: translate(0, -8px);
    }
  }
}

.no-anim,
.no-anim * {
  animation: none !important;
  transition: none !important;
}
</style>
