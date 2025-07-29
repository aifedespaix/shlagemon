<script setup lang="ts">
import LanguageTab from './LanguageTab.vue'
import SaveTab from './SaveTab.vue'
import SettingsShortcutsTab from './ShortcutsTab.vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const save = useSaveStore()

function close() {
  emit('update:modelValue', false)
}

function removeSave() {
  save.reset()
  close()
}

const tabs = [
  {
    label: { text: 'Sauvegarde' },
    component: defineComponent({
      name: 'SettingsSaveTabWrapper',
      setup() {
        return () => h(SaveTab, { onRemove: removeSave })
      },
    }),
  },
  { label: { text: 'Raccourcis' }, component: SettingsShortcutsTab },
  { label: { text: 'Langue' }, component: LanguageTab },
] as const

const activeTab = ref(0)
</script>

<template>
  <UiModal
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    @close="close"
  >
    <h2 class="mb-2 text-center text-lg font-bold">
      Paramètres
    </h2>
    <UiTabs v-model="activeTab" :tabs="tabs" is-small class="mb-4" />
    <LayoutScrollablePanel class="max-h-60vh">
      <template #content>
        <component :is="tabs[activeTab].component" />
      </template>
    </LayoutScrollablePanel>
  </UiModal>
</template>
