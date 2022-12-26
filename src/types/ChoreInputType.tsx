import { IconType } from '../CustomComponents/Icon'

export interface ChoreCreationInputType {
  name: string
  description: string
  cost: string
}

export type ChoreCreationInputFieldTypes = {
  name: string
  label: string
  type: string
  icon?: IconType
  iconSize?: string
  iconColor?: string
  placeHolder?: string
}
