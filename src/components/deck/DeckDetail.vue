<script setup lang="ts">
import type { BaseShlagemon } from '~/type/shlagemon'

const props = defineProps<{ mon: BaseShlagemon | null }>()
const emit = defineEmits<{
  (e: 'openMon', mon: BaseShlagemon): void
}>()
const { t } = useI18n()
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
        v-for="typeItem in props.mon.types"
        :key="typeItem.id"
        :value="typeItem"
        open-on-click
      />
    </div>
    <p class="tiny-scrollbar max-h-40 overflow-auto text-sm italic">
      {{ t(props.mon.descriptionKey || props.mon.description) }}
    </p>
    <div v-if="props.mon.evolutions?.length" class="flex flex-col items-center text-sm font-medium">
      <span>{{ t('components.deck.DeckDetail.evolution') }}</span>
      <div v-for="evo in props.mon.evolutions" :key="evo.base.id" class="mt-1 flex items-center gap-1">
        <UiButton variant="outline" @click="emit('openMon', evo.base)">
          {{ evo.base.name }}
        </UiButton>
        <span v-if="evo.condition.type === 'lvl'">
          - {{ t('components.deck.DeckDetail.level', { n: evo.condition.value }) }}
        </span>
        <span v-else>
          - {{ evo.condition.value.name }}
        </span>
      </div>
    </div>
  </div>
</template>
