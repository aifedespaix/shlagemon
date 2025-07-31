<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const props = defineProps<{ mon: DexShlagemon }>()
const { t } = useI18n()

const stats = computed(() => [
  { label: t('components.shlagemon.DexInfo.hp'), value: props.mon.hp },
  { label: t('components.shlagemon.DexInfo.attack'), value: props.mon.attack },
  { label: t('components.shlagemon.DexInfo.defense'), value: props.mon.defense },
  { label: t('components.shlagemon.DexInfo.smell'), value: props.mon.smelling },
])
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2">
    <h3 class="text-lg font-bold">
      {{ props.mon.base.name }} - lvl {{ props.mon.lvl }}
    </h3>
    <div class="h-32 w-32">
      <ShlagemonImage :id="props.mon.base.id" :alt="props.mon.base.name" class="object-contain" />
    </div>
    <div class="flex gap-1">
      <ShlagemonType
        v-for="typeItem in props.mon.base.types"
        :key="typeItem.id"
        :value="typeItem"
        open-on-click
      />
    </div>
    <ShlagemonStats class="w-full" :stats="stats" />
  </div>
</template>
