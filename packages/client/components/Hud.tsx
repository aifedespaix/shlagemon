'use client'

import * as Progress from '@radix-ui/react-progress'
import React from 'react'
import { useUiStore } from '../stores/ui'

/**
 * Heads-up display showing player statistics.
 */
export function Hud(): JSX.Element {
  const { hp, mana } = useUiStore()
  return (
    <div className="absolute left-4 top-4 w-40 space-y-2">
      <div>
        <span className="text-xs text-white">HP</span>
        <Progress.Root className="relative h-2 w-full overflow-hidden rounded bg-gray-700">
          <Progress.Indicator className="h-full bg-red-500" style={{ width: `${hp}%` }} />
        </Progress.Root>
      </div>
      <div>
        <span className="text-xs text-white">Mana</span>
        <Progress.Root className="relative h-2 w-full overflow-hidden rounded bg-gray-700">
          <Progress.Indicator className="h-full bg-blue-500" style={{ width: `${mana}%` }} />
        </Progress.Root>
      </div>
    </div>
  )
}
