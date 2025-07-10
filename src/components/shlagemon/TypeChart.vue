<script setup lang="ts">
import { shlagemonTypes } from '~/data/shlagemons-type'
import ShlagemonType from './ShlagemonType.vue'

const props = defineProps<{ highlight?: string | null }>()

const types = Object.values(shlagemonTypes)

function getMultiplier(att: typeof types[number], def: typeof types[number]) {
  if (def.weakness.some(w => w.id === att.id))
    return 1.2
  if (def.resistance.some(r => r.id === att.id))
    return 0.8
  return 1
}
</script>

<template>
  <div class="overflow-auto">
    <table class="w-full border-collapse text-center text-xs">
      <thead>
        <tr>
          <th class="p-1" />
          <th v-for="t in types" :key="t.id" class="p-1">
            <ShlagemonType :value="t" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="atk in types" :key="atk.id">
          <th class="p-1 text-right">
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
