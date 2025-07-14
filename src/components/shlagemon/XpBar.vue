<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { xpForLevel } from '~/utils/dexFactory'

const props = defineProps<{ mon: DexShlagemon }>()

const maxXp = computed(() => xpForLevel(props.mon.lvl))
</script>

<template>
  <div class="flex flex-col">
    <div class="mb-1 text-center text-xs">
      Expérience : {{ props.mon.xp.toLocaleString() }} / {{ maxXp.toLocaleString() }}
    </div>
    <ProgressBar :value="props.mon.xp" :max="maxXp" xp class="w-full" />
  </div>
</template>
