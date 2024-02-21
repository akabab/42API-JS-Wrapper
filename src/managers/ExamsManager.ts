import { BaseManager } from './BaseManager'
import { Exam, type IExam } from '../structures/Exam'

export class ExamsManager extends BaseManager {
  async get (target: number): Promise<Exam | null> {
    const res = await this.client.get('exams/' + target)

    return res?.data != null ? new Exam(res.data as IExam) : null
  }

  async fetch (options?: {
    limit?: number
    params?: string[]
  }): Promise<Exam[]> {
    const res = await this.client.fetch(
      'exams/?' + options?.params?.join('&'),
      options?.limit
    )
    return res.map((e) => new Exam(e as IExam))
  }
}
