<script setup lang="ts">
/**
 * Generic modal dialog component.
 *
 * All attributes passed to this component are forwarded to the underlying
 * `<dialog>` element so consumers can set ARIA labels and additional classes.
 */
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{
  modelValue: boolean
  closeOnOutsideClick?: boolean
  footerClose?: boolean
  dialogAutofocus?: boolean
  goldenBorder?: boolean
  contentPadding?: 'default' | 'none'
}>(), {
  closeOnOutsideClick: true,
  footerClose: false,
  dialogAutofocus: false,
  goldenBorder: false,
  contentPadding: 'default',
})
const emit = defineEmits(['update:modelValue', 'close'])
const attrs = useAttrs()
const dialogRef = ref<HTMLDialogElement | null>(null)

/**
 * Display the dialog on the first render when `modelValue` is initially
 * `true`.
 */
onMounted(() => {
  const dialog = dialogRef.value
  if (props.modelValue && dialog && typeof dialog.showModal === 'function')
    dialog.showModal()
})

onUnmounted(() => {
  const dialog = dialogRef.value
  if (dialog?.open)
    dialog.close()
})

function onDialogClick(e: MouseEvent) {
  if (props.closeOnOutsideClick && e.target === dialogRef.value)
    close()
}

watch(() => props.modelValue, (v) => {
  const dialog = dialogRef.value
  if (!dialog)
    return
  if (v) {
    if (!dialog.open && typeof dialog.showModal === 'function')
      dialog.showModal()
  }
  else {
    if (dialog.open)
      close()
  }
})

function close() {
  const dialog = dialogRef.value
  if (!dialog || dialog.classList.contains('closing'))
    return
  dialog.classList.add('closing')
  useEventListener(dialog, 'animationend', () => {
    dialog.classList.remove('closing')
    dialog.close()
  }, { once: true })
}
</script>

<template>
  <teleport to="body">
    <dialog
      ref="dialogRef"
      v-bind="attrs"
      class="modal flex flex-col overflow-hidden"
      :autofocus="props.dialogAutofocus || undefined"
      :tabindex="-1"
      @click="onDialogClick"
      @close="emit('update:modelValue', false); emit('close')"
    >
      <div
        class="modal-content relative flex flex-col overflow-hidden"
        :class="[
          props.goldenBorder ? 'border-2 border-yellow-500 dark:border-yellow-400' : '',
          props.contentPadding === 'none' ? 'p-0' : 'p-4',
        ]"
      >
        <button
          v-if="!props.footerClose"
          type="button"
          class="absolute right-2 top-2 h-6 w-6 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          @click.stop="close()"
        >
          <div i-carbon-close />
        </button>
        <div class="flex flex-1 flex-col overflow-hidden">
          <slot />
        </div>
        <div v-if="props.footerClose" class="mt-4 flex justify-end">
          <UiButton type="danger" class="flex items-center gap-1" @click.stop="close()">
            <div i-carbon-close />
            Fermer
          </UiButton>
        </div>
      </div>
    </dialog>
  </teleport>
</template>

<style scoped>
.modal {
  border: none;
  padding: 0;
  background: transparent;
  animation: fade-in 0.2s ease forwards;
  @apply w-full max-w-xl min-h-xl;
}
.modal:not([open]) {
  display: none;
}
.modal.closing {
  animation: fade-out 0.2s ease forwards;
}
.modal::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}
.modal-content {
  @apply bg-white dark:bg-gray-900 rounded w-full h-full shadow-lg;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
