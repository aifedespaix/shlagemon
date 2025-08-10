import type { Ref } from 'vue'

/** Result of `useFaintAutoEmit`. */
export interface FaintAutoEmitResult {
  /** Attach to the animationend event of the faint animation. */
  onAnimationEnd: () => void
  /** Register a handler fired when the faint animation should be considered finished. */
  onFaintEnd: (fn: () => void) => void
}

/**
 * Emits a faint end event when the animation ends or when the document becomes hidden.
 */
export function useFaintAutoEmit(fainted: Ref<boolean>): FaintAutoEmitResult {
  const visibility = useDocumentVisibility()
  const hook = createEventHook<void>()

  watch([fainted, visibility], ([f, v]) => {
    if (f && v === 'hidden')
      hook.trigger()
  })

  function onAnimationEnd(): void {
    if (fainted.value)
      hook.trigger()
  }

  return {
    onAnimationEnd,
    onFaintEnd: hook.on,
  }
}
