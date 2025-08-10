<script setup lang="ts">
import type { TypeName } from '~/type'
import { shlagemonTypes } from '~/data/shlagemons-type'

/**
 * Props for {@link ShlagemonTypeChart}.
 */
const props = defineProps<{ highlight: TypeName | null }>()

/**
 * Emits for {@link ShlagemonTypeChart}.
 */
const emit = defineEmits<{ (e: 'update:highlight', value: TypeName | null): void }>()

const { t } = useI18n()

// Reactive reference to the highlighted type.
const highlight = useVModel(props, 'highlight', emit)

const typeIds = Object.keys(shlagemonTypes) as TypeName[]

// --- Scroll horizontal à la molette
const tableContainer = ref<HTMLDivElement | null>(null)
function onWheel(e: WheelEvent) {
  if (!tableContainer.value)
    return
  // Uniquement si scroll horizontal possible
  if (e.deltaY !== 0 && tableContainer.value.scrollWidth > tableContainer.value.clientWidth) {
    tableContainer.value.scrollLeft += e.deltaY
  }
}
useEventListener(tableContainer, 'wheel', onWheel, { passive: true })

// --- Table logique
function getMultiplier(att: TypeName, def: TypeName) {
  const attack = shlagemonTypes[att]
  const defend = shlagemonTypes[def]
  if (defend.weakness.includes(attack.id))
    return 1.5
  if (defend.resistance.includes(attack.id))
    return 0.5
  return 1
}

/**
 * Toggles the highlighted type. Clicking again clears the selection.
 *
 * @param typeId - Type identifier to toggle.
 */
function toggleHighlight(typeId: TypeName) {
  highlight.value = highlight.value === typeId ? null : typeId
}
</script>

<template>
  <div
    ref="tableContainer"
    class="tiny-scrollbar max-h-[70vh] max-w-full overflow-auto"
  >
    <table class="min-w-max w-full border-collapse text-center text-xs">
      <thead>
        <tr>
          <th
            class="sticky left-0 top-0 z-30 bg-white p-1 text-gray-600 font-semibold dark:bg-gray-900 dark:text-gray-400"
            style="box-shadow: 2px 2px 0 0 rgba(0,0,0,0.05); min-width: 70px;"
          >
            <div class="mb-1 flex justify-between gap-1 rounded bg-red-200 p-1 text-red-800">
              {{ t('components.shlagemon.TypeChart.defense') }} <div class="i-carbon:arrow-right" />
            </div>
            <div class="mt-1 flex justify-between gap-1 rounded bg-blue-200 p-1 text-blue-800">
              {{ t('components.shlagemon.TypeChart.attack') }} <div class="i-carbon:arrow-down" />
            </div>
          </th>
          <th
            v-for="typeId in typeIds"
            :key="typeId"
            class="sticky top-0 z-20 bg-white p-1 dark:bg-gray-900"
            style="box-shadow: 0 2px 0 0 rgba(0,0,0,0.03);"
            :class="{ 'bg-blue-200 dark:bg-blue-800': highlight === typeId }"
          >
            <button
              type="button"
              class="w-full"
              @click="toggleHighlight(typeId)"
            >
              <ShlagemonType :value="shlagemonTypes[typeId]" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="atk in typeIds" :key="atk">
          <th
            class="sticky left-0 z-10 bg-white p-1 text-right dark:bg-gray-900"
            style="box-shadow: 2px 0 0 0 rgba(0,0,0,0.03);"
            :class="{ 'bg-blue-200 dark:bg-blue-800': highlight === atk }"
          >
            <button
              type="button"
              class="w-full text-right"
              @click="toggleHighlight(atk)"
            >
              <ShlagemonType :value="shlagemonTypes[atk]" />
            </button>
          </th>
          <td
            v-for="def in typeIds"
            :key="def"
            class="border border-gray-200 p-1 dark:border-gray-700"
            :class="{
              'bg-blue-200 dark:bg-blue-800': highlight === atk || highlight === def,
              'font-bold': highlight === atk && highlight === def,
            }"
          >
            {{ getMultiplier(atk, def) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
