import { type FeedbackDetails } from './FeedbackDetails'
import { type User } from './User'

export interface IFeedback {
  id: number
  user: User
  feedbackable_type: string
  feedbackable_id: number
  comment: string
  rating: number
  created_at: Date
  feedback_details: FeedbackDetails[]
}

export class Feedback implements IFeedback {
  id: number
  user: User
  feedbackable_type: string
  feedbackable_id: number
  comment: string
  rating: number
  created_at: Date
  feedback_details: FeedbackDetails[]

  constructor (data: IFeedback) {
    this.id = data.id
    this.user = data.user
    this.feedbackable_type = data.feedbackable_type
    this.feedbackable_id = data.feedbackable_id
    this.comment = data.comment
    this.rating = data.rating
    this.created_at = data.created_at
    this.feedback_details = data.feedback_details
  }
}
