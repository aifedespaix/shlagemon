import { afterEach, describe, expect, it } from 'vitest'

const originalUA = navigator.userAgent
const originalMatchMedia = window.matchMedia

function mockMatchMedia(standalone: boolean) {
  window.matchMedia = (query: string) => ({
    matches: standalone && /display-mode: (?:standalone|fullscreen)/.test(query),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as any
}

afterEach(() => {
  window.history.replaceState(null, '', '/')
  Object.defineProperty(window.navigator, 'userAgent', { value: originalUA, configurable: true })
  window.matchMedia = originalMatchMedia
})

describe('usePwaEnvironment', () => {
  it('detects twa via query parameter', () => {
    window.history.replaceState(null, '', '/?twa=1')
    const { isTwa } = usePwaEnvironment()
    expect(isTwa.value).toBe(true)
  })

  it('detects twa via standalone android chrome', () => {
    mockMatchMedia(true)
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux; Android 10) Chrome/99.0 Mobile',
      configurable: true,
    })
    const { isTwa } = usePwaEnvironment()
    expect(isTwa.value).toBe(true)
  })

  it('is not twa by default', () => {
    mockMatchMedia(false)
    Object.defineProperty(window.navigator, 'userAgent', { value: 'Mozilla/5.0', configurable: true })
    const { isTwa } = usePwaEnvironment()
    expect(isTwa.value).toBe(false)
  })
})
