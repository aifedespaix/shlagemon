<script setup lang="ts">
import { computed } from 'vue'
import Modal from '~/components/modal/Modal.vue'
import CheckBox from '~/components/ui/CheckBox.vue'
import InputTipRange from '~/components/ui/InputTipRange.vue'
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
      <CheckBox v-model="audio.isMusicEnabled" class="flex items-center justify-between">
        <span>Musique</span>
      </CheckBox>
      <InputTipRange
        v-model="audio.musicVolume"
        :disabled="!audio.isMusicEnabled"
      />
      <CheckBox v-model="audio.isSfxEnabled" class="flex items-center justify-between">
        <span>Effets</span>
      </CheckBox>
      <InputTipRange
        v-model="audio.sfxVolume"
        :disabled="!audio.isSfxEnabled"
      />
    </div>
  </Modal>
</template>
