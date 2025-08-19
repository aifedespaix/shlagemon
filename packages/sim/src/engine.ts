import { PRNG } from './prng'

/**
 * Snapshot of the simulation state.
 */
export interface SimulationSnapshot {
  /** Number of completed simulation ticks. */
  tick: number
  /** Accumulated value influenced by inputs and randomness. */
  value: number
  /** Internal state of the pseudo-random number generator. */
  rngState: number
}

/**
 * Deterministic headless simulation engine with a fixed time step.
 */
export class Engine {
  /** Duration of a single simulation step in milliseconds. */
  readonly stepMs: number

  private accumulator = 0
  private prng: PRNG
  private pendingInput = 0

  /**
   * Mutable simulation state.
   */
  private state: SimulationSnapshot

  constructor(seed: number, stepHz = 20) {
    if (stepHz <= 0)
      throw new Error('Step frequency must be positive')
    this.stepMs = Math.floor(1000 / stepHz)
    this.prng = new PRNG(seed)
    this.state = {
      tick: 0,
      value: 0,
      rngState: this.prng.getState(),
    }
  }

  /**
   * Queues an input to be processed on the next simulation step.
   */
  enqueueInput(amount: number): void {
    if (!Number.isFinite(amount))
      throw new Error('Input must be a finite number')
    this.pendingInput += amount
  }

  /**
   * Advances the simulation by the provided time delta.
   */
  update(deltaMs: number): void {
    if (deltaMs < 0)
      throw new Error('Delta time cannot be negative')
    this.accumulator += deltaMs
    while (this.accumulator >= this.stepMs) {
      this.step()
      this.accumulator -= this.stepMs
    }
  }

  private step(): void {
    const randomContribution = Math.floor(this.prng.next() * 10)
    this.state.tick += 1
    this.state.value += this.pendingInput + randomContribution
    this.pendingInput = 0
    this.state.rngState = this.prng.getState()
  }

  /**
   * Creates a serializable snapshot of the current state.
   */
  getSnapshot(): SimulationSnapshot {
    return { ...this.state }
  }

  /**
   * Restores the simulation state from a snapshot.
   */
  setSnapshot(snapshot: SimulationSnapshot): void {
    this.prng.setState(snapshot.rngState)
    this.state = { ...snapshot }
    this.accumulator = 0
    this.pendingInput = 0
  }
}
