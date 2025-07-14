<script setup lang="ts">
import { useDeveloperStore } from '~/stores/developer'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const show = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

const dev = useDeveloperStore()
</script>

<template>
  <Modal v-model="show" footer-close>
    <h3 class="mb-2 text-center text-lg font-bold">
      Paramètres développeur
    </h3>
    <UiCheckBox v-model="dev.debug" class="flex items-center justify-between">
      <span>Mode debug</span>
    </UiCheckBox>
  </Modal>
</template>
