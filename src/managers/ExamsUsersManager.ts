import { BaseManager } from './BaseManager'
import { ExamUser, type IExamUser } from '../structures/ExamUser'

export class ExamsUsersManager extends BaseManager {
  async fetch (
    examId: number,
    options?: { limit?: number, params: string[] }
  ): Promise<ExamUser[]> {
    const res = await this.client.fetch(
      'exams/' + examId + '/exams_users/?' + options?.params.join('&'),
      options?.limit
    )
    return res.map((eu) => new ExamUser(eu as IExamUser))
  }

  /**
   * Look for one exams_users by id
   * @param  {string} id
   * @returns Promise
   */
  async get (id: string): Promise<ExamUser | null> {
    const res = await this.client.get('exams_users/' + id)

    return res?.data != null ? new ExamUser(res.data as IExamUser) : null
  }

  /**
   * Update one exam user by id
   * @param  {number} id
   * @param  {any} body
   * @returns Promise
   */
  async put (id: number, body: any): Promise<void> {
    await this.client.put('exams_users/' + id, body)
  }

  /**
   * Create an exam user for a given exam
   * @param  {number} examId
   * @param  {number} userId
   * @returns Promise
   */
  async post (examId: number, userId: number): Promise<void> {
    await this.client.post('exams/' + examId + '/exams_users', {
      exams_user: {
        user_id: userId
      }
    })
  }
}
