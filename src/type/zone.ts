export type ZoneType = 'village' | 'grotte' | 'sauvage'

export interface ZoneAction {
  id: string
  label: string
}

export interface Zone {
  id: string
  name: string
  type: ZoneType
  actions: ZoneAction[]
}
