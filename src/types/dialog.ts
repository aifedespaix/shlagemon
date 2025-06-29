import type { ButtonType } from './button'

export interface DialogResponse {
  label: string
  imageUrl?: string
  nextId?: string
  action?: () => void
  type?: ButtonType
}

export interface DialogNode {
  id: string
  text: string
  responses: DialogResponse[]
  imageUrl?: string
}
