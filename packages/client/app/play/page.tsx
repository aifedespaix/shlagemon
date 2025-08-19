import dynamic from 'next/dynamic'
import React from 'react'

const GameCanvas = dynamic(() => import('./GameCanvas'), { ssr: false })

export default function PlayPage(): JSX.Element {
  return (
    <main className="h-screen w-screen">
      <GameCanvas />
    </main>
  )
}
