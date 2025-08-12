import type { SavePayload } from './assertSavePayload'
import { createHash } from 'node:crypto'

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Verify the optional checksum of a {@link SavePayload}.
 *
 * The checksum is a SHA-256 hash of the JSON stringified `data` field. If the
 * payload does not contain a checksum, `true` is returned.
 *
 * Depending on the environment, this function may perform the verification
 * synchronously (Node.js) or asynchronously (Web Crypto API).
 *
 * @param payload - Payload to verify.
 * @returns `true` when the checksum matches or is absent, otherwise `false`.
 */
export function verifyChecksum(payload: SavePayload): boolean | Promise<boolean> {
  if (!payload.checksum)
    return true

  const json = JSON.stringify(payload.data)

  // Browser / Web Crypto path
  if (globalThis.crypto?.subtle) {
    return globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(json))
      .then(hash => bufferToHex(hash) === payload.checksum)
      .catch(() => false)
  }

  // Node.js fallback
  try {
    const hash = createHash('sha256').update(json).digest('hex')
    return hash === payload.checksum
  }
  catch {
    return false
  }
}
