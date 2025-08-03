/**
 * Generate a RFC 4122 version 4 UUID.
 *
 * Uses the native `crypto.randomUUID` when available. If not, it falls back to
 * `crypto.getRandomValues` and, as a last resort, to `Math.random`.
 *
 * The fallback paths are not meant to be cryptographically secure but ensure the
 * application continues to work on older browsers.
 */
export function generateUuid(): string {
  const nativeUuid = globalThis.crypto?.randomUUID?.()
  if (nativeUuid)
    return nativeUuid

  const crypto = globalThis.crypto
  if (crypto?.getRandomValues) {
    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)
    // Set version to 4 --- 0100
    bytes[6] = (bytes[6] & 0x0F) | 0x40
    // Set variant to RFC 4122 --- 10xx
    bytes[8] = (bytes[8] & 0x3F) | 0x80
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  }

  // Non-secure fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
