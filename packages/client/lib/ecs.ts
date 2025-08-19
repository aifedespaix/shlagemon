/**
 * Minimal entity component system for synchronizing positions.
 */
export interface Vector2 {
  x: number
  y: number
}

export interface Entity {
  id: string
  position: Vector2
}

export interface Snapshot {
  entities: Entity[]
}

/**
 * Reactive store holding the latest snapshot.
 */
export class EcsStore {
  private entities = new Map<string, Entity>()

  getEntities(): Entity[] {
    return Array.from(this.entities.values())
  }

  applySnapshot(snapshot: Snapshot): void {
    this.entities.clear()
    for (const e of snapshot.entities)
      this.entities.set(e.id, { id: e.id, position: { ...e.position } })
  }

  updateEntity(id: string, position: Vector2): void {
    const existing = this.entities.get(id)
    if (existing)
      existing.position = position
    else
      this.entities.set(id, { id, position })
  }
}

/**
 * Creates a simple ECS store.
 */
export function createEcsStore(): EcsStore {
  return new EcsStore()
}
