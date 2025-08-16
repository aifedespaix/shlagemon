import type { UserModule } from '~/types'

/**
 * Instantiate the breeding store on startup so breeding jobs
 * persist and progress even when the breeding panel is closed.
 */
export const install: UserModule = ({ isClient }) => {
  if (!isClient)
    return
  useBreedingStore()
}
