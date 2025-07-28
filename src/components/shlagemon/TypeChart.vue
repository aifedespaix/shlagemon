<script setup lang="ts">
import { shlagemonTypes } from '~/data/shlagemons-type'

const props = defineProps<{ highlight?: string | null }>()

const types = Object.values(shlagemonTypes)

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
onMounted(() => {
  tableContainer.value?.addEventListener('wheel', onWheel, { passive: true })
})
onBeforeUnmount(() => {
  tableContainer.value?.removeEventListener('wheel', onWheel)
})

// --- Table logique
function getMultiplier(att: typeof types[number], def: typeof types[number]) {
  if (def.weakness.some(w => w.id === att.id))
    return 1.5
  if (def.resistance.some(r => r.id === att.id))
    return 0.5
  return 1
}
</script>

<template>
  <div
    ref="tableContainer"
    class="tiny-scrollbar max-h-[70vh] max-w-full overflow-auto"
    tabindex="0"
  >
    <table class="min-w-max w-full border-collapse text-center text-xs">
      <thead>
        <tr>
          <th
            class="sticky left-0 top-0 z-30 bg-white p-1 text-gray-600 font-semibold dark:bg-gray-900 dark:text-gray-400"
            style="box-shadow: 2px 2px 0 0 rgba(0,0,0,0.05); min-width: 70px;"
          >
            <div class="mb-1 flex justify-between gap-1 rounded bg-red-200 p-1 text-red-800">
              Défense <div class="i-carbon:arrow-right" />
            </div>
            <div class="mt-1 flex justify-between gap-1 rounded bg-blue-200 p-1 text-blue-800">
              Attaque <div class="i-carbon:arrow-down" />
            </div>
          </th>
          <th
            v-for="t in types"
            :key="t.id"
            class="sticky top-0 z-20 bg-white p-1 dark:bg-gray-900"
            style="box-shadow: 0 2px 0 0 rgba(0,0,0,0.03);"
          >
            <ShlagemonType :value="t" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="atk in types" :key="atk.id">
          <th
            class="sticky left-0 z-10 bg-white p-1 text-right dark:bg-gray-900"
            style="box-shadow: 2px 0 0 0 rgba(0,0,0,0.03);"
          >
            <ShlagemonType :value="atk" />
          </th>
          <td
            v-for="def in types"
            :key="def.id"
            class="border border-gray-200 p-1 dark:border-gray-700"
            :class="{
              'bg-blue-200 dark:bg-blue-800': props.highlight === atk.id || props.highlight === def.id,
              'font-bold': props.highlight === atk.id && props.highlight === def.id,
            }"
          >
            {{ getMultiplier(atk, def) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
