import { ScaleTeam, type IScaleTeam } from './ScaleTeam'
import { User, type IUser } from './User'

export class CorrectionSlot {
  id: number
  begin_at: Date
  end_at: Date
  scale_team: ScaleTeam | null
  user: User | null

  constructor (data: any) {
    this.id = data.id
    this.begin_at = new Date(data.begin_at as string)
    this.end_at = new Date(data.end_at as string)
    this.scale_team = data.scale_team != null ? new ScaleTeam(data.scale_team as IScaleTeam) : null
    this.user = data.user != null && data.user !== 'invisible' ? new User(data.user as IUser) : null
  }
}
