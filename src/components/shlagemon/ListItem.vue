<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const _props = defineProps({
  mon: { type: Object as PropType<DexShlagemon>, required: true },
  isActive: { type: Boolean, default: false },
  isHighlighted: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  item: { type: Object as PropType<any>, default: null },
  showCheckbox: { type: Boolean, default: false },
})
const emit = defineEmits(['click', 'activate'])

const itemClass = computed(() => [
  _props.isActive
    ? 'bg-sky-500/10 border-sky-500 ring-2 ring-sky-400'
    : _props.isHighlighted
      ? 'bg-sky-400/10 border-sky-400 ring-2 ring-sky-300'
      : _props.mon.rarity === 100
        ? 'border-yellow-500 bg-yellow-100/10 dark:bg-yellow-900/5'
        : '',
])
</script>

<template>
  <UiListItem
    class="gap-1"
    :class="itemClass"
    :active="isActive"
    :disabled="locked || disabled"
    role="option"
    tabindex="0"
    @click.stop="() => emit('click')"
    @contextmenu.stop.prevent="() => emit('activate')"
    @keydown.enter.space.prevent="() => emit('click')"
  >
    <!-- Image Shlagemon, carré, prend toute la hauteur -->
    <template #left>
      <div class="relative h-10 w-10 flex flex-shrink-0 items-center justify-center">
        <ShlagemonImage
          :id="mon.base.id"
          :alt="mon.base.name"
          :shiny="mon.isShiny"
          class="h-full w-full rounded object-contain"
        />
        <span
          v-if="mon.isShiny"
          class="pointer-events-none absolute left-0 top-0 animate-pulse select-none text-xs text-yellow-400"
          aria-label="Shiny"
        >
          <div class="i-carbon-star" />
        </span>
      </div>
    </template>
    <!-- Infos principales (toujours 2 lignes) -->
    <div class="min-w-0 flex flex-1 flex-col gap-1 leading-tight">
      <div class="flex items-center gap-0.5 truncate text-sm font-semibold">
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
        <ShlagemonType
          v-for="t in mon.base.types"
          :key="t.id"
          :value="t"
          size="xs"
          open-on-click
        />
      </div>
    </div>
    <!-- Colonne droite, compacte et alignée -->
    <template #right>
      <div class="h-full min-w-7 flex flex-col items-end justify-between gap-0.5">
        <div class="flex-1">
          <InventoryWearableItemIcon
            v-if="item"
            :item="item"
            class="h-4 w-4"
          />
        </div>
        <UiCheckBox
          v-if="showCheckbox"
          class="scale-85"
          :model-value="isActive"
          :disabled="locked || disabled"
          @update:model-value="() => emit('activate')"
          @click.stop
        />
        <div class="flex-1 text-center text-[10px] text-gray-500 leading-none font-mono dark:text-gray-400">
          lvl <span class="font-bold">{{ mon.lvl }}</span>
        </div>
      </div>
    </template>
  </UiListItem>
</template>
