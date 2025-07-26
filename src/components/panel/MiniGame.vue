<script setup lang="ts">
import { getMiniGame } from '~/data/minigames'
import { getZoneTrack } from '~/data/music'

const mini = useMiniGameStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
const audio = useAudioStore()
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

function start() {
  mini.play()
  audio.fadeToMusic(miniGameMusic)
}
function leaveGame() {
  mini.quit()
  panel.showVillage()
  audio.fadeToMusic(zoneTrack.value)
}
function win() {
  mini.finish('win')
}
function lose() {
  mini.finish('lose')
}
function draw() {
  mini.finish('draw')
}

const intro = computed(() => gameDef.value?.createIntro(start))
const success = computed(() => gameDef.value?.createSuccess(leaveGame))
const drawDialog = computed(() => gameDef.value?.createDraw?.(leaveGame))
const failure = computed(() => gameDef.value?.createFailure(leaveGame))
</script>

<template>
  <LayoutTitledPanel
    v-if="gameDef"
    :title="gameDef.label"
    :exit-text="t('components.panel.MiniGame.exit')"
    @exit="leaveGame"
  >
    <div class="tiny-scrollbar flex flex-col overflow-auto">
      <DialogBox
        v-if="mini.phase === 'intro'"
        :character="gameDef.character"
        :dialog-tree="intro!"
        :exit-track="miniGameMusic"
        orientation="col"
      />
      <component
        :is="GameComp"
        v-else-if="mini.phase === 'game'"
        @win="win"
        @lose="lose"
        @draw="draw"
      />
      <DialogBox
        v-else-if="mini.phase === 'success'"
        :character="gameDef.character"
        :dialog-tree="success!"
        :exit-track="zoneTrack"
        orientation="col"
      />
      <DialogBox
        v-else-if="mini.phase === 'failure'"
        :character="gameDef.character"
        :dialog-tree="failure!"
        :exit-track="zoneTrack"
        orientation="col"
      />
      <DialogBox
        v-else-if="mini.phase === 'draw'"
        :character="gameDef.character"
        :dialog-tree="drawDialog!"
        :exit-track="zoneTrack"
        orientation="col"
      />
    </div>
  </LayoutTitledPanel>
</template>
