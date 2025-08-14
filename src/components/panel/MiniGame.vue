<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { getMiniGame } from '~/data/minigames'
import { getZoneTrack } from '~/data/music'

const mini = useMiniGameStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
const { t } = useI18n()

const miniGameMusic = '/audio/musics/games/mini-game.ogg'
const zoneTrack = computed(() => getZoneTrack(zone.current.id, zone.current.type) ?? miniGameMusic)
const gameDef = computed(() => mini.currentId ? getMiniGame(mini.currentId) : undefined)
const GameComp = shallowRef()

watchEffect(async () => {
  if (gameDef.value)
    GameComp.value = (await gameDef.value.component()).default
  else
    GameComp.value = undefined
})

function leaveGame() {
  mini.quit()
  panel.showVillage()
}

const createIntro = computed(() => gameDef.value
  ? (start: () => void) => gameDef.value!.createIntro(() => {
      mini.play()
      start()
    })
  : undefined)

function createOutro(result: string | undefined, exit: () => void): DialogNode[] {
  if (!gameDef.value)
    return []
  if (result === 'win')
    return gameDef.value.createSuccess(exit)
  if (result === 'lose')
    return gameDef.value.createFailure(exit)
  if (result === 'draw' && gameDef.value.createDraw)
    return gameDef.value.createDraw(exit)
  return gameDef.value.createFailure(exit)
}
</script>

<template>
  <PoiDialogFlow
    v-if="gameDef"
    :title="gameDef.label"
    :exit-text="t('components.panel.MiniGame.exit')"
    :character="gameDef.character"
    :create-intro="createIntro"
    :create-outro="createOutro"
    :exit-track="zoneTrack"
    @exit="leaveGame"
  >
    <template #default="slot">
      <component
        :is="GameComp"
        @win="() => { mini.finish('win'); slot.finish?.('win') }"
        @lose="() => { mini.finish('lose'); slot.finish?.('lose') }"
        @draw="() => { mini.finish('draw'); slot.finish?.('draw') }"
      />
    </template>
  </PoiDialogFlow>
</template>
