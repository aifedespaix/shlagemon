<script setup lang="ts">
import { getMiniGame } from '~/data/minigames'
import { getZoneTrack } from '~/data/music'

const mini = useMiniGameStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
const audio = useAudioStore()
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
function exit() {
  mini.quit()
  panel.showVillage()
  audio.fadeToMusic(zoneTrack.value)
}
function win() {
  mini.finish(true)
}
function lose() {
  mini.finish(false)
}

const intro = computed(() => gameDef.value?.createIntro(start))
const success = computed(() => gameDef.value?.createSuccess(exit))
const failure = computed(() => gameDef.value?.createFailure(exit))
</script>

<template>
  <div v-if="gameDef" class="tiny-scrollbar flex flex-col overflow-auto">
    <DialogBox
      v-if="mini.phase === 'intro'"
      :character="gameDef.character"
      :avatar-url="`/characters/${gameDef.character.id}/${gameDef.character.id}.png`"
      :dialog-tree="intro!"
      :exit-track="miniGameMusic"
      orientation="col"
    />
    <component
      :is="GameComp"
      v-else-if="mini.phase === 'game'"
      @win="win"
      @lose="lose"
    />
    <DialogBox
      v-else-if="mini.phase === 'success'"
      :character="gameDef.character"
      :avatar-url="`/characters/${gameDef.character.id}/${gameDef.character.id}.png`"
      :dialog-tree="success!"
      :exit-track="zoneTrack"
      orientation="col"
    />
    <DialogBox
      v-else-if="mini.phase === 'failure'"
      :character="gameDef.character"
      :avatar-url="`/characters/${gameDef.character.id}/${gameDef.character.id}.png`"
      :dialog-tree="failure!"
      :exit-track="zoneTrack"
      orientation="col"
    />
  </div>
</template>
