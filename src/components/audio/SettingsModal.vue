<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const show = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})
const audio = useAudioStore()
</script>

<template>
  <UiModal v-model="show" footer-close>
    <div class="flex flex-col gap-3">
      <h3 class="text-center text-lg font-bold">
        Paramètres audio
      </h3>
      <UiCheckBox v-model="audio.isMusicEnabled" class="flex items-center justify-between">
        <span>Musique</span>
      </UiCheckBox>
      <UiInputTipRange
        v-model="audio.musicVolume"
        :disabled="!audio.isMusicEnabled"
      />
      <UiInfo v-if="!audio.isMusicEnabled" color="alert">
        Désactiver la musique réduit les dégâts de vos Shlagémons de 10%.
        <br>(Ba oui, je me suis pas cassé le cul à faire une bande-son pour rien !)
      </UiInfo>
      <UiCheckBox v-model="audio.isSfxEnabled" class="flex items-center justify-between">
        <span>Effets</span>
      </UiCheckBox>
      <UiInputTipRange
        v-model="audio.sfxVolume"
        :disabled="!audio.isSfxEnabled"
      />
    </div>
  </UiModal>
</template>
