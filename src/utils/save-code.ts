import CryptoJS from 'crypto-js'
import { compressToUint8Array, decompressFromUint8Array } from 'lz-string'

export const DEFAULT_SAVE_KEY = 'shlagemon-save-key'

export const PERSISTED_STORE_KEYS = [
  'achievements',
  'achievementsFilter',
  'audio',
  'ball',
  'battleStats',
  'deckFilter',
  'developer',
  'dexFilter',
  'dialog',
  'disease',
  'egg',
  'eggBox',
  'equipment',
  'game',
  'gameState',
  'inventory',
  'inventoryFilter',
  'itemUsage',
  'kingPotion',
  'locale',
  'mainPanel',
  'miniGame',
  'mobileTab',
  'player',
  'potionInfo',
  'shlagedex',
  'shopFilter',
  'shortcuts',
  'zone',
  'zoneProgress',
  'zoneVisit',
] as const

export type PersistedStoreId = typeof PERSISTED_STORE_KEYS[number]
export type GameSave = Partial<Record<PersistedStoreId, unknown>>

const BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const BASE62 = BASE62_ALPHABET.length

function base62Encode(bytes: Uint8Array): string {
  if (bytes.length === 0)
    return ''
  const digits: number[] = [0]
  for (const byte of bytes) {
    let carry = byte
    for (let j = 0; j < digits.length; j++) {
      carry += digits[j] << 8
      digits[j] = carry % BASE62
      carry = Math.floor(carry / BASE62)
    }
    while (carry > 0) {
      digits.push(carry % BASE62)
      carry = Math.floor(carry / BASE62)
    }
  }
  return digits.reverse().map(d => BASE62_ALPHABET[d]).join('')
}

function base62Decode(str: string): Uint8Array {
  if (!str)
    return new Uint8Array(0)
  const bytes: number[] = [0]
  for (const char of str) {
    const value = BASE62_ALPHABET.indexOf(char)
    if (value === -1)
      throw new Error('Invalid character')
    let carry = value
    for (let j = 0; j < bytes.length; j++) {
      carry += bytes[j] * BASE62
      bytes[j] = carry & 0xFF
      carry >>= 8
    }
    while (carry > 0) {
      bytes.push(carry & 0xFF)
      carry >>= 8
    }
  }
  return Uint8Array.from(bytes.reverse())
}

function uint8ArrayToWordArray(u8: Uint8Array): CryptoJS.lib.WordArray {
  const words: number[] = []
  for (let i = 0; i < u8.length; i++)
    words[i >>> 2] |= u8[i] << (24 - (i % 4) * 8)
  return CryptoJS.lib.WordArray.create(words, u8.length)
}

function wordArrayToUint8Array(wordArray: CryptoJS.lib.WordArray): Uint8Array {
  const { words, sigBytes } = wordArray
  const result = new Uint8Array(sigBytes)
  for (let i = 0; i < sigBytes; i++)
    result[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xFF
  return result
}

export function collectSave(): GameSave {
  const save: GameSave = {}
  for (const key of PERSISTED_STORE_KEYS) {
    const raw = localStorage.getItem(key)
    if (raw !== null) {
      try {
        save[key] = JSON.parse(raw)
      }
      catch {
        save[key] = raw
      }
    }
  }
  return save
}

export function applySave(save: GameSave): void {
  for (const [key, value] of Object.entries(save) as [PersistedStoreId, unknown][]) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function exportSave(save: GameSave, secret = DEFAULT_SAVE_KEY): string {
  const json = JSON.stringify(save)
  const compressed = compressToUint8Array(json)
  const hash = CryptoJS.MD5(uint8ArrayToWordArray(compressed))
  const hashBytes = wordArrayToUint8Array(hash)
  const payload = new Uint8Array(compressed.length + hashBytes.length)
  payload.set(compressed)
  payload.set(hashBytes, compressed.length)
  const key = CryptoJS.SHA256(secret)
  const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000')
  const encrypted = CryptoJS.AES.encrypt(
    uint8ArrayToWordArray(payload),
    key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 },
  ).ciphertext
  const encryptedBytes = wordArrayToUint8Array(encrypted)
  return base62Encode(encryptedBytes)
}

export function importSave(code: string, secret = DEFAULT_SAVE_KEY): GameSave | null {
  try {
    const encryptedBytes = base62Decode(code)
    const key = CryptoJS.SHA256(secret)
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000')
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: uint8ArrayToWordArray(encryptedBytes) } as CryptoJS.lib.CipherParams,
      key,
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 },
    )
    const payload = wordArrayToUint8Array(decrypted)
    if (payload.length <= 16)
      return null
    const data = payload.slice(0, -16)
    const storedHash = payload.slice(-16)
    const actualHash = wordArrayToUint8Array(CryptoJS.MD5(uint8ArrayToWordArray(data)))
    for (let i = 0; i < 16; i++) {
      if (storedHash[i] !== actualHash[i])
        return null
    }
    const json = decompressFromUint8Array(data)
    if (!json)
      return null
    return JSON.parse(json) as GameSave
  }
  catch {
    return null
  }
}
