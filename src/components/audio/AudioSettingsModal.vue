<script setup lang="ts">
import { computed } from 'vue'
import Modal from '~/components/modal/Modal.vue'
import CheckBox from '~/components/ui/CheckBox.vue'
import { useAudioStore } from '~/stores/audio'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const show = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})
const audio = useAudioStore()
</script>

<template>
  <Modal v-model="show" footer-close>
    <div class="flex flex-col gap-3">
      <h3 class="text-center text-lg font-bold">
        Paramètres audio
      </h3>
      <div class="flex items-center justify-between">
        <span>Musique</span>
        <CheckBox v-model="audio.isMusicEnabled" />
      </div>
      <input
        v-model.number="audio.musicVolume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        :disabled="!audio.isMusicEnabled"
      >
      <div class="flex items-center justify-between">
        <span>Effets</span>
        <CheckBox v-model="audio.isSfxEnabled" />
      </div>
      <input
        v-model.number="audio.sfxVolume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        :disabled="!audio.isSfxEnabled"
      >
    </div>
  </Modal>
</template>
