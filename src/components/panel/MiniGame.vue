<script setup lang="ts">
import { defineAsyncComponent, computed, watchEffect, shallowRef } from 'vue'
import { getMiniGame } from '~/data/minigames'
import { useMiniGameStore } from '~/stores/miniGame'
import { useMainPanelStore } from '~/stores/mainPanel'

const mini = useMiniGameStore()
const panel = useMainPanelStore()
const gameDef = computed(() => mini.currentId ? getMiniGame(mini.currentId) : undefined)
const GameComp = shallowRef()

watchEffect(async () => {
  if (gameDef.value)
    GameComp.value = defineAsyncComponent(gameDef.value.component)
})

function start() {
  mini.play()
}
function exit() {
  mini.quit()
  panel.showVillage()
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
  <div v-if="gameDef">
    <DialogBox
      v-if="mini.phase === 'intro'"
      :character="gameDef.character"
      :avatar-url="`/characters/${gameDef.character.id}/${gameDef.character.id}.png`"
      :dialog-tree="intro!"
      orientation="col"
    />
    <component
      v-else-if="mini.phase === 'game'"
      :is="GameComp"
      @win="win"
      @lose="lose"
    />
    <DialogBox
      v-else-if="mini.phase === 'success'"
      :character="gameDef.character"
      :avatar-url="`/characters/${gameDef.character.id}/${gameDef.character.id}.png`"
      :dialog-tree="success!"
      orientation="col"
    />
    <DialogBox
      v-else-if="mini.phase === 'failure'"
      :character="gameDef.character"
      :avatar-url="`/characters/${gameDef.character.id}/${gameDef.character.id}.png`"
      :dialog-tree="failure!"
      orientation="col"
    />
  </div>
</template>
