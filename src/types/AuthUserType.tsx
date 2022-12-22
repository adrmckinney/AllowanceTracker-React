export interface AuthUserType {
  id: number
  family_id: number
  name: string
  email: string
  username: string
  api_token: string
  permission: number
  thumbnail: string
  created_at: EpochTimeStamp | string
}
