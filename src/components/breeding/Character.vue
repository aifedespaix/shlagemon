<script setup lang="ts">
import type { Character } from '~/type/character'

interface Props {
  readonly character: Character
  readonly typingText: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="w-full flex-1 overflow-hidden">
      <CharacterImage :id="props.character.id" :alt="props.character.name" class="h-full w-full object-contain" />
    </div>

    <UiTypingText
      :text="props.typingText"
      :aria-label="props.typingText"
      aria-live="polite"
      class="text-center text-sm transition-all"
    />
  </div>
</template>
