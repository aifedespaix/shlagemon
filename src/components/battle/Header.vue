<script setup lang="ts">
import type { Trainer } from '~/type'

const props = defineProps<{ zoneName?: string, trainer?: Trainer, defeated?: number }>()
const defeated = computed(() => props.defeated ?? 0)
const zone = useZoneStore()
const info = useZoneInfoStore()
</script>

<template>
  <div class="w-full flex items-center gap-2 overflow-hidden font-bold" :class="props.trainer ? 'justify-end' : 'justify-center'">
    <template v-if="props.zoneName && info.hasMultipleZones">
      <div class="flex flex-col items-center justify-center p-x-20">
        <div class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center" :title="props.zoneName">
          {{ props.zoneName }}
        </div>
        <div v-if="zone.current.type === 'sauvage'" class="whitespace-nowrap text-xs">
          {{ zone.current.minLevel }} - {{ zone.current.maxLevel }}
        </div>
      </div>
    </template>

    <template v-else-if="props.trainer">
      <div class="flex items-stretch gap-2">
        <div class="flex flex-col items-end justify-between">
          <div>{{ props.trainer.character.name }}</div>
          <div class="flex gap-2">
            <UiImageByBackground
              v-for="i in props.trainer.shlagemons.length"
              :key="i"
              src="/items/shlageball/shlageball.webp"
              class="h-4 w-4"
              :class="{ 'saturate-0': i <= defeated }"
            />
          </div>
        </div>

        <!-- Le point clé : [contain:size] + stretch -->
        <div class="[contain:size] w-8 flex shrink-0 items-center self-stretch justify-center overflow-hidden">
          <CharacterImage
            :id="props.trainer.character.id"
            :alt="props.trainer.character.name"
            class="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    </template>
  </div>
</template>
