<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'

type OptionValue = string | number

export interface Option {
  label: string
  value: OptionValue
}

const props = withDefaults(defineProps<{
  modelValue: OptionValue | null
  options: readonly Option[]
  placeholder?: string
  disabled?: boolean
  isCompact?: boolean
}>(), {
  isCompact: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: OptionValue): void
}>()

const selectedOption = computed(() =>
  props.options.find(opt => opt.value === props.modelValue) ?? null,
)

const { t } = useI18n()
</script>

<template>
  <Listbox
    v-slot="{ open }"
    :model-value="selectedOption"
    :disabled="props.disabled"
    by="value"
    @update:model-value="option => emit('update:modelValue', option.value)"
  >
    <div class="relative w-full">
      <ListboxButton
        class="relative w-full flex items-center justify-between gap-2 border-2 rounded-lg text-slate-800 shadow-sm transition-all dark:text-slate-100 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
        :class="[
          props.isCompact
            ? 'px-2 py-1 h-8 text-xs border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800'
            : 'px-4 py-2 h-11 text-sm border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800',
          { 'ring-2 ring-sky-500': open },
        ]"
      >
        <span class="w-full truncate text-left">
          <span v-if="selectedOption">{{ selectedOption.label }}</span>
          <span v-else class="text-slate-400 dark:text-slate-500">{{ placeholder ?? t('placeholder') }}</span>
        </span>

        <span
          class="i-carbon:chevron-left transition-transform duration-150 ease-in-out"
          :class="[
            props.isCompact ? 'text-base' : 'text-xl',
            open ? '-rotate-90' : '',
          ]"
          aria-hidden="true"
        />
      </ListboxButton>

      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <ListboxOptions
          v-if="open"
          class="tiny-scrollbar absolute z-10 mt-1 max-h-60 w-full overflow-auto border rounded-lg text-sm shadow-md"
          :class="props.isCompact
            ? 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-1'
            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-2'"
        >
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            v-slot="{ active, selected }"
            :value="option"
            as="template"
          >
            <li
              class="cursor-pointer px-4 transition-colors"
              :class="[
                props.isCompact ? 'py-1 text-xs' : 'py-2 text-sm',
                selected ? 'bg-sky-100 dark:bg-sky-600/40 text-sky-700 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-100',
                active ? 'bg-slate-100 dark:bg-slate-700' : '',
              ]"
            >
              {{ option.label }}
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
