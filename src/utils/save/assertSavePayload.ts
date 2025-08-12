import type { GameSave } from '../save-code'

/**
 * Structure of a saved game payload stored in a file.
 */
export interface SavePayload {
  /** Incremented whenever the payload structure changes. */
  version: number
  /** Actual saved data. */
  data: GameSave
  /** Optional SHA-256 checksum of {@link SavePayload.data}. */
  checksum?: string
}

/**
 * Current supported save payload version.
 */
export const SAVE_VERSION = 1 as const

/**
 * Assert that an unknown value conforms to {@link SavePayload}.
 *
 * @param value - The value to validate.
 * @throws {Error} If the value is not a valid {@link SavePayload} or the
 *         version is unsupported.
 */
export function assertSavePayload(value: unknown): asserts value is SavePayload {
  if (typeof value !== 'object' || value === null)
    throw new Error('Invalid save payload: not an object')

  const { version, data, checksum } = value as Record<string, unknown>

  if (!Number.isInteger(version))
    throw new Error('Invalid save payload: missing version')
  if (version !== SAVE_VERSION)
    throw new Error(`Unsupported save version: ${version}`)

  if (typeof data !== 'object' || data === null)
    throw new Error('Invalid save payload: missing data')

  if (checksum !== undefined && typeof checksum !== 'string')
    throw new Error('Invalid save payload: checksum must be a string')
}
