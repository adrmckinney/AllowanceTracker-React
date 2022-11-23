export interface ChoreCreationInputType {
  name: string
  description: string
  cost: string
}

export type ChoreCreationInputFieldTypes = {
  name: string
  label: string
  type: string
  icon?: string
  iconSize?: string
  iconColor?: string
  placeHolder?: string
}
