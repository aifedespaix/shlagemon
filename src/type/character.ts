export interface Character {
  id: string
  name: string
  gender: Gender
}

type Gender = 'male' | 'female' | 'unknown'
