<script setup lang="ts">
import type { BaseShlagemon } from '~/type/shlagemon'

const props = defineProps<{ mon: BaseShlagemon | null }>()
</script>

<template>
  <div v-if="props.mon" class="max-w-xl w-full flex flex-col gap-2">
    <h2 class="text-center text-lg font-bold">
      {{ props.mon.name }}
    </h2>
    <div class="mx-auto h-40 w-full">
      <ShlagemonImage :id="props.mon.id" :alt="props.mon.name" class="h-full w-full object-contain" />
    </div>
    <div class="flex justify-center gap-1">
      <ShlagemonType
        v-for="t in props.mon.types"
        :key="t.id"
        :value="t"
        open-on-click
      />
    </div>
    <p class="tiny-scrollbar max-h-40 overflow-auto text-sm italic">
      {{ props.mon.description }}
    </p>
    <div v-if="props.mon.evolution" class="flex flex-col items-center text-sm font-medium">
      <span>Évolution :</span>
      <span>
        {{ props.mon.evolution.base.name }}
        <template v-if="props.mon.evolution.condition.type === 'lvl'">
          - lvl {{ props.mon.evolution.condition.value }}
        </template>
        <template v-else>
          - {{ props.mon.evolution.condition.value.name }}
        </template>
      </span>
    </div>
  </div>
</template>
