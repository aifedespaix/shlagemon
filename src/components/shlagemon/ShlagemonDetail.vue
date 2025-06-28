<script setup lang="ts">
import type { DexShlagemon } from '~/types/shlagemon'
import { xpForLevel } from '~/utils/dexFactory'

defineProps<{ mon: DexShlagemon | null, show: boolean }>()
const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="show && mon" class="fixed inset-0 flex items-center justify-center bg-black/50" @click.self="emit('close')">
    <div class="max-w-sm w-full rounded bg-white p-4 dark:bg-gray-900">
      <h2 class="mb-2 text-lg font-bold">
        {{ mon.name }} - lvl {{ mon.lvl }}
      </h2>
      <img :src="`/shlagemons/${mon.id}/${mon.id}.png`" :alt="mon.name" class="mx-auto mb-2 max-h-40 object-contain">
      <p class="mb-4 text-sm italic">
        {{ mon.description }}
      </p>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div class="font-semibold">
          HP
        </div><div>{{ mon.hp }}</div>
        <div class="font-semibold">
          Attaque
        </div><div>{{ mon.attack }}</div>
        <div class="font-semibold">
          Défense
        </div><div>{{ mon.defense }}</div>
        <div class="font-semibold">
          Puanteur
        </div><div>{{ mon.smelling }}</div>
        <div class="font-semibold">
          XP
        </div><div>{{ mon.xp }} / {{ xpForLevel(mon.lvl) }}</div>
      </div>
      <div class="mt-4 text-right">
        <button class="bg-primary rounded px-3 py-1 text-white" @click="emit('close')">
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>
