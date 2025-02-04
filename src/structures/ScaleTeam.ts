import { type Feedback } from './Feedback'
import { type Team } from './Team'
import { type User } from './User'

export interface IScaleTeam {
  id: number
  scale_id: number
  comment: string
  created_at: string
  updated_at: string
  feedback: string
  finale_mark: number
  flag: object
  begin_at: Date
  correcteds: User[]
  corrector: User
  truant: object
  filled_at: Date
  questions_with_answers: object[]
  scale: object
  team: Team
  feedbacks: Feedback[]
}

export class ScaleTeam implements IScaleTeam {
  id: number
  scale_id: number
  comment: string
  created_at: string
  updated_at: string
  feedback: string
  finale_mark: number
  flag: object
  begin_at: Date
  correcteds: User[]
  corrector: User
  truant: object
  filled_at: Date
  questions_with_answers: object[]
  scale: object
  team: Team
  feedbacks: Feedback[]

  constructor (data: IScaleTeam) {
    this.id = data.id
    this.scale_id = data.scale_id
    this.comment = data.comment
    this.created_at = data.created_at
    this.updated_at = data.updated_at
    this.feedback = data.feedback
    this.finale_mark = data.finale_mark
    this.flag = data.flag
    this.begin_at = data.begin_at
    this.correcteds = data.correcteds
    this.corrector = data.corrector
    this.truant = data.truant
    this.filled_at = data.filled_at
    this.questions_with_answers = data.questions_with_answers
    this.scale = data.scale
    this.team = data.team
    this.feedbacks = data.feedbacks
  }
}
