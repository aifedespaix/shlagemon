<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import Button from '~/components/ui/Button.vue'
import SelectOption from '~/components/ui/SelectOption.vue'
import { useInterfaceStore } from '~/stores/interface'
import { useSaveStore } from '~/stores/save'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const save = useSaveStore()
const ui = useInterfaceStore()

const tab = ref<'save' | 'interface'>('save')

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
    <h2 class="mb-2 text-center text-lg font-bold">
      Profil
    </h2>
    <nav class="mb-4 flex justify-center gap-2">
      <button
        class="rounded px-2 py-1"
        :class="tab === 'save' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'"
        @click="tab = 'save'"
      >
        Sauvegarde
      </button>
      <button
        class="rounded px-2 py-1"
        :class="tab === 'interface' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'"
        @click="tab = 'interface'"
      >
        Interface
      </button>
    </nav>
    <div v-if="tab === 'save'" class="flex flex-col gap-4">
      <p class="text-center">
        Voulez-vous supprimer toutes vos progressions et votre sauvegarde ?
      </p>
      <Button type="danger" class="mx-auto flex items-center gap-1" @click="removeSave">
        <div i-carbon-trash-can />
        Supprimer
      </Button>
    </div>
    <div v-else class="flex flex-col gap-2">
      <label class="flex flex-col gap-1">
        <span>Panel mobile sous le jeu</span>
        <SelectOption
          v-model="ui.mobileMainPanel"
          :options="[
            { label: 'Zones', value: 'zone' },
            { label: 'Schlagédex', value: 'dex' },
          ]"
        />
      </label>
    </div>
  </Modal>
</template>
