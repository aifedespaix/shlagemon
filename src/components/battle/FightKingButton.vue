<script setup lang="ts">
import type { SavageZoneId } from '~/type/zone'

const panel = useMainPanelStore()
const trainerBattle = useTrainerBattleStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()
const dev = useDeveloperStore()
const { t } = useI18n()

const currentKing = computed(() => zone.getKing(zone.current.id as SavageZoneId))
const kingLabel = computed(() =>
  currentKing.value?.character.gender === 'female'
    ? t('components.battle.FightKingButton.female')
    : t('components.battle.FightKingButton.male'),
)

const visible = computed(() => (
  !!currentKing.value
  && !progress.isKingDefeated(zone.current.id)
  && progress.canFightKing(zone.current.id)) || dev.debug,
)

function fightKing() {
  const trainer = currentKing.value
  if (!trainer)
    return
  trainerBattle.setQueue([trainer])
  panel.showTrainerBattle()
}
</script>

<template>
  <UiButton
    v-if="visible"
    class="absolute right-1 top-6 z-150 m-1 flex animate-pulse-alt gap-2 text-xs"
    hover="animate-none"
    type="danger"
    @click="fightKing"
  >
    <div>{{ t('components.battle.FightKingButton.challenge', { label: kingLabel }) }}</div>

    <div class="i-game-icons:queen-crown" />
  </UiButton>
</template>
