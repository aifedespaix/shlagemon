import type { GameSave, PersistedStoreId } from '~/utils/save-code'
import { importSave, PERSISTED_STORE_KEYS } from '~/utils/save-code'

/**
 * Handle importing a game save from a file or a share target.
 *
 * Exposes reactive state describing the loaded file and parsed payload
 * alongside helper methods to validate and apply the imported data.
 */
export function useSaveImport() {
  /** Currently selected save file. */
  const file = ref<File | null>(null)

  /** Parsed save payload extracted from the file. */
  const payload = ref<GameSave | null>(null)

  /**
   * Tracks the current operation stage.
   * - `idle`: no file loaded
   * - `loading`: reading a file
   * - `loaded`: file parsed, awaiting validation
   * - `ready`: payload validated and ready for import
   * - `error`: an error occurred
   * - `importing`: applying the payload
   */
  type ImportStatus = 'idle' | 'loading' | 'loaded' | 'ready' | 'error' | 'importing'
  const status = ref<ImportStatus>('idle')

  /** Optional error message when status is `error`. */
  const error = ref<string | null>(null)

  /** Save store with extra helpers provided by the persistence plugin. */
  const saveStore = useSaveStore() as ReturnType<typeof useSaveStore> & {
    replaceWith: (data: GameSave) => void
    persist: () => Promise<void>
  }

  const router = useRouter()

  /**
   * Load and parse a save file selected by the user.
   *
   * @param f The file containing the exported save data.
   */
  async function loadFromFile(f: File): Promise<void> {
    file.value = f
    status.value = 'loading'
    error.value = null
    try {
      const text = (await f.text()).trim()
      const data = importSave(text)
      if (!data) {
        payload.value = null
        status.value = 'error'
        error.value = 'Invalid save file'
        return
      }
      payload.value = data
      status.value = 'loaded'
    }
    catch (e) {
      payload.value = null
      status.value = 'error'
      error.value = (e as Error).message
    }
  }

  /**
   * Retrieve the first file from share target form data and parse it.
   *
   * @param formData `FormData` received from the share target.
   */
  async function loadFromShareTarget(formData: FormData): Promise<void> {
    for (const value of formData.values()) {
      if (value instanceof File) {
        await loadFromFile(value)
        return
      }
    }
    error.value = 'No file provided'
  }

  /**
   * Validate the parsed payload against the list of persisted store keys.
   *
   * @returns `true` if the payload is valid and ready to be imported.
   */
  function validate(): boolean {
    if (!payload.value) {
      status.value = 'error'
      error.value = 'No payload loaded'
      return false
    }

    for (const key of Object.keys(payload.value)) {
      if (!PERSISTED_STORE_KEYS.includes(key as PersistedStoreId)) {
        status.value = 'error'
        error.value = `Unknown key: ${key}`
        return false
      }
    }

    status.value = 'ready'
    error.value = null
    return true
  }

  /**
   * Replace the current save with the validated payload and persist it.
   * Navigates back to the root page upon success.
   */
  async function confirmImport(): Promise<void> {
    if (!payload.value)
      throw new Error('Cannot import without payload')
    status.value = 'importing'
    saveStore.replaceWith(payload.value)
    await saveStore.persist()
    await router.push('/')
  }

  return {
    file,
    payload,
    status,
    error,
    loadFromFile,
    loadFromShareTarget,
    validate,
    confirmImport,
  }
}
