<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import Button from '~/components/ui/Button.vue'
import { useSaveStore } from '~/stores/save'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const save = useSaveStore()

function close() {
  emit('update:modelValue', false)
}

function removeSave() {
  save.reset()
  close()
}
</script>

<template>
  <Modal
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    @close="close"
  >
    <h2 class="mb-4 text-center text-lg font-bold">
      Profil
    </h2>
    <Button type="danger" class="mx-auto flex items-center gap-1" @click="removeSave">
      <div i-carbon-trash-can />
      Supprimer
    </Button>
  </Modal>
</template>
