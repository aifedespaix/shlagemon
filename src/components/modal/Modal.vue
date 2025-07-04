<script setup lang="ts">
import Button from '~/components/ui/Button.vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  closeOnOutsideClick?: boolean
  footerClose?: boolean
}>(), {
  closeOnOutsideClick: true,
  footerClose: false,
})
const emit = defineEmits(['update:modelValue', 'close'])
const dialogRef = ref<HTMLDialogElement | null>(null)

function onDialogClick(e: MouseEvent) {
  if (props.closeOnOutsideClick && e.target === dialogRef.value)
    close()
}

watch(() => props.modelValue, (v) => {
  const dialog = dialogRef.value
  if (!dialog)
    return
  if (v) {
    if (!dialog.open)
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
  dialog.addEventListener('animationend', () => {
    dialog.classList.remove('closing')
    dialog.close()
  }, { once: true })
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="modal"
    @click="onDialogClick"
    @close="emit('update:modelValue', false); emit('close')"
  >
    <div class="modal-content relative flex flex-col">
      <button
        v-if="!props.footerClose"
        type="button"
        class="absolute right-2 top-2 h-6 w-6 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        @click.stop="close()"
      >
        &times;
      </button>
      <slot />
      <div v-if="props.footerClose" class="mt-4 flex justify-end">
        <Button type="danger" class="flex items-center gap-1" @click.stop="close()">
          <div i-carbon-close />
          Fermer
        </Button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  border: none;
  padding: 0;
  background: transparent;
  animation: fade-in 0.2s ease forwards;
}
.modal.closing {
  animation: fade-out 0.2s ease forwards;
}
.modal::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}
.modal-content {
  @apply bg-white dark:bg-gray-900 rounded p-4 w-full max-w-sm shadow-lg;
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
