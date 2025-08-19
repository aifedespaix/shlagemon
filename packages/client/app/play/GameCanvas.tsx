'use client'

import type { EcsStore } from '../../lib/ecs'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { Matrix4 } from 'three'
import { Hud } from '../../components/Hud'
import { createEcsStore } from '../../lib/ecs'
import { WsClient } from '../../lib/wsClient'

interface EntitiesProps {
  ecs: EcsStore
}

/**
 * Renders all entities from the ECS as instanced meshes.
 */
function Entities({ ecs }: EntitiesProps): JSX.Element {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const matrix = useMemo(() => new Matrix4(), [])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh)
      return
    const entities = ecs.getEntities()
    entities.forEach((entity, index) => {
      matrix.makeTranslation(entity.position.x, 0, entity.position.y)
      mesh.setMatrixAt(index, matrix)
    })
    mesh.count = entities.length
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 100]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </instancedMesh>
  )
}

/**
 * Root game canvas with WebSocket syncing and HUD.
 */
export default function GameCanvas(): JSX.Element {
  const ecs = useRef(createEcsStore()).current

  useEffect(() => {
    const ws = new WsClient('ws://localhost:2567', ecs)
    ws.connect()
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, { x: number, y: number }> = {
        KeyQ: { x: -1, y: 0 },
        KeyW: { x: 0, y: 1 },
        KeyE: { x: 1, y: 0 },
        KeyR: { x: 0, y: -1 },
      }
      const dir = map[e.code]
      if (dir)
        ws.sendInput(dir)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [ecs])

  return (
    <>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight />
        <Entities ecs={ecs} />
      </Canvas>
      <Hud />
    </>
  )
}
