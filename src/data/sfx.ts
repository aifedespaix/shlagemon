import { Howl } from 'howler'

const sfxFiles = import.meta.glob('../../public/audio/sfx/**/*.ogg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const sfxUrls = Object.fromEntries(
  Object.entries(sfxFiles).map(([path, url]) => {
    const rel = path.split('/audio/sfx/')[1]
    const id = rel.replace('.ogg', '').replace(/\//g, '-')
    return [id, url]
  }),
) as Record<string, string>

export type SfxId = keyof typeof sfxUrls

export function preloadSfx(): Record<SfxId, Howl> {
  const map = {} as Record<SfxId, Howl>
  for (const [id, url] of Object.entries(sfxUrls) as [SfxId, string][]) {
    const howl = import.meta.env.VITEST
      ? ({
          _src: url,
          play: () => {},
          stop: () => {},
          loop: () => {},
          volume: () => {},
        } as unknown as Howl)
      : new Howl({
        src: [url],
        preload: true,
      })
    map[id] = howl
  }
  return map
}
