<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { computed } from 'vue'

interface Props {
  mon: DexShlagemon
  points: number
}
const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'click'): void }>()
const { t } = useI18n()

const rarityAfter = computed<number>(() => Math.min(100, props.mon.rarity + props.points))
</script>

<template>
  <div
    class="relative h-full w-full flex items-center justify-center"
    @click="emit('click')"
  >
    <ShlagemonImage
      :id="mon.base.id"
      :alt="t(mon.base.name)"
      class="h-full w-full object-contain transition-transform duration-300 will-change-transform"
    />

    <div class="pointer-events-none">
      <span
        class="absolute left-0 right-0 top-0 border border-emerald-100 rounded-full px-2 py-0.5 text-center text-xs text-emerald-800 font-medium dark:border-emerald-900/50 dark:text-emerald-200"
        aria-label="Rareté actuelle"
      >
        {{ t('components.panel.Dojo.rarity.current') }}: {{ mon.rarity }}
      </span>

      <span
        class="absolute bottom-0 left-0 right-0 rounded-full bg-emerald-100 px-2 py-0.5 text-center text-xs text-emerald-800 font-medium dark:bg-emerald-900/50 dark:text-emerald-200"
        :class="rarityAfter === 100 ? 'mask-rainbow' : ''"
        aria-label="Rareté après entraînement"
      >
        {{ t('components.panel.Dojo.rarity.after') }}: {{ rarityAfter }}
      </span>
    </div>
  </div>
</template>
