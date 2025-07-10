<script setup lang="ts">
import type { Trainer } from '~/type'
import { computed } from 'vue'
import CharacterImage from '~/components/character/CharacterImage.vue'
import ImageByBackground from '~/components/ui/ImageByBackground.vue'
import { useZoneStore } from '~/stores/zone'

const props = defineProps<{ zoneName?: string, trainer?: Trainer, defeated?: number }>()
const defeated = computed(() => props.defeated ?? 0)
const zone = useZoneStore()
</script>

<template>
  <div class="w-full flex items-center gap-2 overflow-hidden font-bold" :class="props.trainer ? 'justify-end' : 'justify-center'">
    <template v-if="props.zoneName">
      <div class="flex flex-col items-center justify-center p-x-20">
        <div class="overflow-ellipsis w-full overflow-hidden text-ellipsis whitespace-nowrap text-center" :title="props.zoneName">
          {{ props.zoneName }}
        </div>
        <div v-if="zone.current.maxLevel" class="whitespace-nowrap text-xs">
          {{ zone.current.minLevel }} - {{ zone.current.maxLevel }}
        </div>
      </div>
    </template>

    <template v-else-if="props.trainer">
      <div class="flex items-center gap-2">
        <div class="h-full flex flex-col items-end">
          <div>{{ props.trainer.character.name }}</div>
          <div class="flex gap-2">
            <ImageByBackground
              v-for="i in props.trainer.shlagemons.length"
              :key="i"
              src="/items/shlageball/shlageball.png"
              class="h-4 w-4"
              :class="{ 'saturate-0': i <= defeated }"
            />
          </div>
        </div>
        <CharacterImage :id="props.trainer.character.id" :alt="props.trainer.character.name" class="h-full" />
      </div>
    </template>
  </div>
</template>
