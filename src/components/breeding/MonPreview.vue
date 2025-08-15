<script setup lang="ts">
/**
 * Carte visuelle réutilisable pour la sélection/changement de Shlagémon.
 * - Si `mon` est défini → affiche l'image + badges (rarete / type d'œuf)
 *   et rend la carte cliquable pour demander un changement.
 * - Sinon → affiche un bouton "Sélectionner".
 * A11y : role="button" + aria-label, focus ring, clic clavier (Enter/Space).
 */
import type { EggType } from '~/stores/egg'
import type { DexShlagemon } from '~/type/shlagemon'
import { computed } from 'vue'
import { eggColorClass } from '~/constants/egg'

interface Props {
  /** Shlagémon sélectionné (ou null si aucun). */
  mon: DexShlagemon | null
  /** Type d'œuf dérivé du mon (ou null si inconnu). */
  eggType: EggType | null
  /** Active le clic sur la carte quand un mon est sélectionné. */
  clickableWhenSelected?: boolean
  /** Taille du bouton de sélection quand aucun mon n'est choisi. */
  selectBtnSize?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  clickableWhenSelected: true,
  selectBtnSize: 'md',
})

const emit = defineEmits<{
  /** Demande d’ouvrir le sélecteur (quand aucun mon). */
  (e: 'select'): void
  /** Demande de changer le mon (quand un mon est cliqué). */
  (e: 'change'): void
}>()

const { t } = useI18n()

const isClickable = computed(() => !!props.mon && props.clickableWhenSelected)

/** Accessibilité : libellé de la carte quand sélectionné */
const cardAria = computed(() => {
  if (!props.mon)
    return t('components.panel.Breeding.selectMon')
  const name = t(props.mon.base.name)
  return t('components.panel.Breeding.changeSelected', { name })
})

function onCardActivate() {
  if (isClickable.value)
    emit('change')
}

function onKeydown(e: KeyboardEvent) {
  if (!isClickable.value)
    return
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    emit('change')
  }
}
</script>

<template>
  <div
    class="min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl bg-gray-50 p-3 outline-none dark:bg-gray-800"
    :class="[
      isClickable ? 'cursor-pointer focus-visible:ring focus-visible:ring-primary/40' : '',
    ]"
    :tabindex="isClickable ? 0 : -1"
    role="button"
    :aria-label="cardAria"
    @click="onCardActivate"
    @keydown="onKeydown"
  >
    <div class="relative h-full w-full flex items-center justify-center">
      <!-- Sélectionné : image + badges -->
      <template v-if="mon">
        <ShlagemonImage
          :id="mon.base.id"
          :alt="t(mon.base.name)"
          :shiny="mon.isShiny"
          class="h-full w-full object-contain transition-transform duration-300 will-change-transform"
        />
        <div class="pointer-events-none absolute left-2 top-2 flex gap-2">
          <span
            class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 font-medium dark:bg-emerald-900/50 dark:text-emerald-200"
            :aria-label="t('components.panel.Breeding.rarity')"
          >
            {{ t('components.panel.Breeding.rarity') }}: {{ mon.rarity }}
          </span>
          <span
            class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium dark:bg-amber-900/50"
            :class="eggType ? eggColorClass(eggType) : ''"
            :aria-label="t('components.panel.Breeding.eggType')"
          >
            {{ t('components.panel.Breeding.eggType') }}: {{ eggType }}
          </span>
        </div>
      </template>

      <!-- Non sélectionné : bouton pour ouvrir le sélecteur -->
      <template v-else>
        <UiButton
          type="primary"
          :class="[
            selectBtnSize === 'sm' ? 'w-20 aspect-square'
            : selectBtnSize === 'lg' ? 'w-28 aspect-square'
              : 'w-24 aspect-square',
          ]"
          @click.stop="emit('select')"
        >
          {{ t('components.panel.Breeding.selectMon') }}
        </UiButton>
      </template>
    </div>
  </div>
</template>
