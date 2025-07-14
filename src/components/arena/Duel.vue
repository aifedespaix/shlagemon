<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const props = defineProps<{ player: DexShlagemon, enemy: DexShlagemon }>()
const emit = defineEmits<{ (e: 'end', win: boolean): void }>()

function onEnd(result: 'win' | 'lose' | 'draw') {
  emit('end', result === 'win')
}
</script>

<template>
  <BattleRound
    :player="props.player"
    :enemy="props.enemy"
    :click-attack="false"
    :capture-enabled="false"
    :show-xp-bar="false"
    :show-effects="false"
    @end="onEnd"
  >
    <template #header>
      <slot name="header" />
    </template>
  </BattleRound>
</template>
