import type { SimulationSnapshot } from './engine'
import { Engine } from './engine'

/**
 * Input applied at a specific simulation frame.
 */
export interface ScenarioInput {
  /** Frame number at which the input is applied. */
  frame: number
  /** Numeric value added to the simulation on that frame. */
  value: number
}

/**
 * Runs a deterministic scenario for testing purposes.
 * @param seed Seed for the pseudo-random number generator.
 * @param inputs Time-ordered list of frame-based inputs.
 * @returns Array of snapshots taken after each frame.
 */
export function runScenario(seed: number, inputs: ScenarioInput[]): SimulationSnapshot[] {
  const engine = new Engine(seed)
  const ordered = [...inputs].sort((a, b) => a.frame - b.frame)
  const snapshots: SimulationSnapshot[] = []

  const lastFrame = ordered.length ? ordered[ordered.length - 1].frame : 0
  const totalFrames = Math.max(lastFrame + 1, 10)

  let inputIndex = 0
  for (let frame = 0; frame < totalFrames; frame++) {
    while (inputIndex < ordered.length && ordered[inputIndex].frame === frame) {
      engine.enqueueInput(ordered[inputIndex].value)
      inputIndex += 1
    }
    engine.update(engine.stepMs)
    snapshots.push(engine.getSnapshot())
  }

  return snapshots
}
