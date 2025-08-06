<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AccessibilityTab from './AccessibilityTab.vue'
import InterfaceTab from './InterfaceTab.vue'
import LanguageTab from './LanguageTab.vue'
import SaveTab from './SaveTab.vue'
import SettingsShortcutsTab from './ShortcutsTab.vue'
import ShortcutsTabFooter from './ShortcutsTabFooter.vue'
import SupportTab from './SupportTab.vue'

const props = defineProps<{ modelValue: boolean }>()

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const { t } = useI18n()

const save = useSaveStore()

function close() {
  emit('update:modelValue', false)
}

function removeSave() {
  save.clearPersisted()
  save.reset()
  window.location.reload()
}

const { isMobile } = storeToRefs(useUIStore())

const tabs = computed(() => {
  const arr = [
    {
      label: { text: t('components.settings.SettingsModal.tabs.save'), icon: 'i-carbon-save' },
      component: defineComponent({
        name: 'SettingsSaveTabWrapper',
        setup() {
          return () => h(SaveTab, { onRemove: removeSave })
        },
      }),
    },
    { label: { text: t('components.settings.SettingsModal.tabs.language'), icon: 'i-carbon-language' }, component: LanguageTab },
    { label: { text: t('components.settings.SettingsModal.tabs.interface'), icon: 'i-carbon-display' }, component: InterfaceTab },
    { label: { text: t('components.settings.SettingsModal.tabs.accessibility'), icon: 'i-carbon-accessibility' }, component: AccessibilityTab },
  ]

  if (!isMobile.value) {
    arr.splice(1, 0, {
      label: { text: t('components.settings.SettingsModal.tabs.shortcuts'), icon: 'i-carbon-keyboard' },
      component: SettingsShortcutsTab,
      footer: ShortcutsTabFooter,
    })
  }

  arr.push({
    label: { text: t('components.settings.SettingsModal.tabs.support'), icon: 'i-carbon-favorite' },
    component: SupportTab,
  })
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
    class="h-full"
    @update:model-value="emit('update:modelValue', $event)"
    @close="close"
  >
    <h2 class="mb-2 text-center text-lg font-bold">
      {{ t('components.settings.SettingsModal.title') }}
    </h2>
    <UiTabs v-model="activeTab" :tabs="tabs" is-small icons-only class="mb-4 flex-1" />
  </UiModal>
</template>
