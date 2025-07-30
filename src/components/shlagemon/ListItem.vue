<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const props = defineProps({
  mon: { type: Object as PropType<DexShlagemon>, required: true },
  isActive: { type: Boolean, default: false },
  isHighlighted: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  item: { type: Object as PropType<any>, default: null },
  showCheckbox: { type: Boolean, default: false },
})
const emit = defineEmits(['click', 'activate'])
</script>

<template>
  <div
    class="
      relative flex items-center px-1.5 py-0.5 rounded-lg border shadow-sm
      cursor-pointer transition-all duration-150 group select-none outline-none
      min-h-11
      focus:ring-2 focus:ring-sky-400
    "
    :class="[
      isActive
        ? 'bg-sky-500/10 border-sky-500 ring-2 ring-sky-400'
        : isHighlighted
          ? 'bg-sky-400/10 border-sky-400 ring-2 ring-sky-300'
          : mon.rarity === 100
            ? 'border-yellow-500 bg-yellow-100/10 dark:bg-yellow-900/5'
            : 'border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70',
      locked || disabled
        ? 'opacity-50 pointer-events-none saturate-0'
        : 'hover:shadow-lg hover:scale-[1.01] active:scale-100',
    ]"
    role="option"
    :aria-selected="isActive"
    :aria-disabled="disabled || locked"
    tabindex="0"
    @click.stop="() => emit('click')"
    @contextmenu.stop.prevent="() => emit('activate')"
    @keydown.enter.space.prevent="() => emit('click')"
  >
    <!-- Image Shlagemon, carré, prend toute la hauteur -->
    <div class="relative flex items-center justify-center h-10 w-10 mr-1 flex-shrink-0">
      <ShlagemonImage
        :id="mon.base.id"
        :alt="mon.base.name"
        :shiny="mon.isShiny"
        class="h-full w-full object-contain rounded"
      />
      <span
        v-if="mon.isShiny"
        class="absolute top-0 left-0 text-yellow-400 text-xs animate-pulse select-none pointer-events-none"
        aria-label="Shiny"
      >
        <div class="i-carbon-star" />
      </span>
    </div>
    <!-- Infos principales (toujours 2 lignes) -->
    <div class="flex flex-col min-w-0 flex-1 leading-tight">
      <div class="flex items-center gap-0.5 font-semibold text-sm truncate">
        {{ mon.base.name }}
        <span
          v-if="mon.rarity === 100"
          class="ml-0.5 text-amber-400"
          aria-label="Légendaire"
        >
          <div class="i-carbon-crown inline-block align-middle text-base" />
        </span>
      </div>
      <div class="flex gap-0.5">
        <ShlagemonType v-for="t in mon.base.types" :key="t.id" :value="t" size="2xs" />
      </div>
    </div>
    <!-- Colonne droite, compacte et alignée -->
    <div class="flex flex-col items-center justify-between h-full min-w-7 ml-1">
      <InventoryWearableItemIcon
        v-if="item"
        :item="item"
        class="h-4 w-4 mb-0.5"
      />
      <UiCheckBox
        v-if="showCheckbox"
        class="scale-90 mb-0.5"
        :model-value="isActive"
        :disabled="locked || disabled"
        @update:model-value="() => emit('activate')"
        @click.stop
      />
      <div class="text-[10px] text-gray-500 dark:text-gray-400 font-mono text-center leading-none">
        lvl <span class="font-bold">{{ mon.lvl }}</span>
      </div>
    </div>
  </div>
</template>
