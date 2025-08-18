import type { EggType } from './egg'
import { createPinia, setActivePinia } from 'pinia'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { toast } from '~/modules/toast'
import { useEggStore } from './egg'

vi.mock('~/modules/i18n', () => ({ i18n: { global: { t: (key: string, params?: any) => params?.count ? `${key}:${params.count}` : key } } }))
vi.mock('~/modules/toast', () => ({ toast: { success: vi.fn() } }))

function readyEgg(store: ReturnType<typeof useEggStore>) {
  store.startIncubation('feu' as EggType)
  store.incubator.forEach((egg) => {
    egg.hatchesAt = Date.now() - 1000
  })
}

describe('egg store notifications', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('aggregates multiple ready eggs into a single toast', () => {
    const store = useEggStore()
    readyEgg(store)
    readyEgg(store)
    store.notifyReady()
    expect(toast.success).toHaveBeenCalledTimes(1)
    expect(toast.success).toHaveBeenCalledWith('stores.egg.toast.readyMultiple:2')
  })
})
