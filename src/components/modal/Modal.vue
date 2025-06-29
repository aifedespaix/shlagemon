<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'close'])
const dialogRef = ref<HTMLDialogElement | null>(null)

watch(() => props.modelValue, (v) => {
  const dialog = dialogRef.value
  if (!dialog)
    return
  if (v) {
    dialog.showModal()
  }
  else {
    close()
  }
})

function close() {
  const dialog = dialogRef.value
  if (!dialog)
    return
  dialog.classList.add('closing')
  dialog.addEventListener('animationend', () => {
    dialog.classList.remove('closing')
    dialog.close()
    emit('update:modelValue', false)
    emit('close')
  }, { once: true })
}
</script>

<template>
  <dialog ref="dialogRef" class="modal" @close="emit('update:modelValue', false); emit('close')">
    <div class="modal-content">
      <slot />
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
