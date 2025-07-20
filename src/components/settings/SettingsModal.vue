<script setup lang="ts">
import LanguageSelector from '~/components/LanguageSelector.vue'
import { useSaveStore } from '~/stores/save'
import ShortcutsTab from './ShortcutsTab.vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const save = useSaveStore()

const tab = ref<'save' | 'shortcuts' | 'language'>('save')

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
      Paramètres
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
        :class="tab === 'shortcuts' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'"
        @click="tab = 'shortcuts'"
      >
        Raccourcis
      </button>
      <button
        class="rounded px-2 py-1"
        :class="tab === 'language' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'"
        @click="tab = 'language'"
      >
        Langue
      </button>
    </nav>
    <LayoutScrollablePanel class="max-h-60vh">
      <template #content>
        <div v-if="tab === 'save'" class="flex flex-col gap-4">
          <p class="text-center">
            Voulez-vous supprimer toutes vos progressions et votre sauvegarde ?
          </p>
          <UiButton type="danger" class="mx-auto flex items-center gap-1" @click="removeSave">
            <div i-carbon-trash-can />
            Supprimer
          </UiButton>
        </div>
        <div v-else-if="tab === 'shortcuts'" class="flex flex-col gap-2">
          <ShortcutsTab />
        </div>
        <div v-else class="flex justify-center">
          <LanguageSelector />
        </div>
      </template>
    </LayoutScrollablePanel>
  </Modal>
</template>
