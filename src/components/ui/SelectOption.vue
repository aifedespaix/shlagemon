<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

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

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const highlightedIndex = ref<number | null>(null)

const selectedOption = computed(() =>
  props.options.find(opt => opt.value === props.modelValue) ?? null,
)

function toggleDropdown() {
  if (props.disabled)
    return
  isOpen.value = !isOpen.value
  if (isOpen.value)
    highlightedIndex.value = getSelectedIndex()
}

function selectOption(option: Option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

function getSelectedIndex(): number {
  return props.options.findIndex(opt => opt.value === props.modelValue)
}

function highlightNext() {
  if (!isOpen.value)
    return
  if (highlightedIndex.value === null || highlightedIndex.value >= props.options.length - 1)
    highlightedIndex.value = 0
  else highlightedIndex.value++
}

function highlightPrev() {
  if (!isOpen.value)
    return
  if (highlightedIndex.value === null || highlightedIndex.value <= 0)
    highlightedIndex.value = props.options.length - 1
  else highlightedIndex.value--
}

onKeyStroke('ArrowDown', (e) => {
  if (!isOpen.value)
    return
  e.preventDefault()
  highlightNext()
})

onKeyStroke('ArrowUp', (e) => {
  if (!isOpen.value)
    return
  e.preventDefault()
  highlightPrev()
})

onKeyStroke('Enter', () => {
  if (isOpen.value && highlightedIndex.value !== null)
    selectOption(props.options[highlightedIndex.value])
})

onKeyStroke('Escape', () => {
  isOpen.value = false
})

onClickOutside(triggerRef, () => {
  isOpen.value = false
})
</script>

<template>
  <div ref="triggerRef" class="relative w-full">
    <button
      class="relative w-full flex items-center justify-between gap-2 border-2 rounded-lg text-slate-800 shadow-sm transition-all dark:text-slate-100 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
      :class="[
        props.isCompact
          ? 'px-2 py-1 h-8 text-xs border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800'
          : 'px-4 py-2 h-11 text-sm border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800',
        { 'ring-2 ring-sky-500': isOpen },
      ]"
      type="button"
      :aria-expanded="isOpen"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      <span class="w-full truncate text-left">
        <span v-if="selectedOption">{{ selectedOption.label }}</span>
        <span v-else class="text-slate-400 dark:text-slate-500">{{ placeholder ?? 'Sélectionner…' }}</span>
      </span>

      <!-- Chevron Icon -->
      <span
        class="i-carbon:chevron-left transition-transform duration-150 ease-in-out"
        :class="[
          props.isCompact ? 'text-base' : 'text-xl',
          isOpen ? '-rotate-90' : '',
        ]"
        aria-hidden="true"
      />
    </button>

    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <ul
        v-if="isOpen"
        ref="dropdownRef"
        class="tiny-scrollbar absolute z-10 mt-1 max-h-60 w-full overflow-auto border rounded-lg text-sm shadow-md"
        :class="props.isCompact
          ? 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-1'
          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-2'"
        role="listbox"
      >
        <li
          v-for="(option, idx) in options"
          :key="option.value"
          class="cursor-pointer px-4 transition-colors"
          :class="[
            props.isCompact ? 'py-1 text-xs' : 'py-2 text-sm',
            option.value === modelValue ? 'bg-sky-100 dark:bg-sky-600/40 text-sky-700 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-100',
            highlightedIndex === idx ? 'bg-slate-100 dark:bg-slate-700' : '',
          ]"
          role="option"
          :aria-selected="option.value === modelValue"
          @click="selectOption(option)"
          @mouseenter="highlightedIndex = idx"
          @mouseleave="highlightedIndex = null"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>
