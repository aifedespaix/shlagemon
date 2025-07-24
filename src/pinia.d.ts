import type { Path } from 'deep-pick-omit'
import type { StateTree } from 'pinia'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
import 'pinia-plugin-persistedstate'

declare module 'pinia-plugin-persistedstate' {
  interface Persistence<State extends StateTree = StateTree> {
    /**
     * Dot-notation paths to pick from state before persisting.
     * Alias for `pick` from the library.
     */
    paths?: Path<State>[] | string[]
  }

  // Provide backwards-compatible alias used in the codebase
  type PersistedStateOptions<State extends StateTree = StateTree> = PersistenceOptions<State>
}
