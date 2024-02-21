export interface IFeedbackDetails {
  id: number
  rate: number
  kind: string
}

export class FeedbackDetails implements IFeedbackDetails {
  id: number
  rate: number
  kind: string

  constructor (data: IFeedbackDetails) {
    this.id = data.id
    this.rate = data.rate
    this.kind = data.kind
  }
}
