import type { ToastOptions } from 'vue3-toastify'
import { toast as baseToast } from 'vue3-toastify'

/**
 * Toast utility playing a sound effect for each notification.
 *
 * Success toasts trigger the "toast-achievement" sound while all other
 * notifications use the "toast-default" sound. Sound playback relies on the
 * shared {@link useAudioStore} to respect user audio settings.
 */
function playToastSound(isSuccess: boolean): void {
  const audio = useAudioStore()
  audio.playSfx(isSuccess ? 'toast-achievement' : 'toast-default')
}

function isSuccess(options?: ToastOptions): boolean {
  return options?.type === baseToast.TYPE.SUCCESS
}

/**
 * Proxy wrapping vue3-toastify's `toast` to add sound effects.
 */
export const toast: typeof baseToast = new Proxy(baseToast, {
  apply(target, thisArg, argArray) {
    const options = argArray[1] as ToastOptions | undefined
    playToastSound(isSuccess(options))
    return Reflect.apply(target, thisArg, argArray)
  },
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver)
    if (typeof value !== 'function')
      return value
    return (...args: any[]) => {
      if (!['dismiss', 'clearAll', 'update', 'done'].includes(String(prop))) {
        const options = args[1] as ToastOptions | undefined
        playToastSound(prop === 'success' || isSuccess(options))
      }
      return value.apply(target, args)
    }
  },
})
