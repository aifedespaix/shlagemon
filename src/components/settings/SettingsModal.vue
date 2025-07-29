<script setup lang="ts">
import { storeToRefs } from 'pinia'
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

const { isMobile } = storeToRefs(useUIStore())

const tabs = computed(() => {
  const arr = [
    {
      label: { text: 'Sauvegarde', icon: 'i-carbon-save' },
      component: defineComponent({
        name: 'SettingsSaveTabWrapper',
        setup() {
          return () => h(SaveTab, { onRemove: removeSave })
        },
      }),
    },
    { label: { text: 'Langue', icon: 'i-carbon-language' }, component: LanguageTab },
  ]

  if (!isMobile.value) {
    arr.splice(1, 0, {
      label: { text: 'Raccourcis', icon: 'i-carbon-keyboard' },
      component: SettingsShortcutsTab,
    })
  }

  return arr
})

const activeTab = ref(0)
watch(tabs, (val) => {
  if (activeTab.value >= val.length)
    activeTab.value = val.length - 1
})
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
