import { BaseManager } from './BaseManager'
import { CursusUser, type ICursusUser } from '../structures/CursusUser'

export class CursusUsersManager extends BaseManager {
  /**
   * Look for an array of cursus_users
   * @param  {{limit?:number;params:string[]}} options?
   * @returns Promise
   */
  async fetch (options?: { limit?: number, params: string[] }): Promise<CursusUser[]> {
    const res = await this.client.fetch(
      'cursus_users/?' + options?.params.join('&'),
      options?.limit
    )
    return res.map((u) => new CursusUser((u as ICursusUser)))
  }

  /**
   * Look for one cursus_user by id
   * @param  {string} id
   * @returns Promise
   */
  async get (id: string): Promise<CursusUser | null> {
    const res = await this.client.get('cursus_users/' + id)

    return res?.data != null ? new CursusUser(res.data as ICursusUser) : null
  }

  /**
   * Update one cursus_user by id
   * @param  {number} id
   * @returns Promise
   */
  async put (id: number, body: any): Promise<void> {
    await this.client.put('cursus_users/' + id, body)
  }

  /**
   * Create new cursus_user
   * @param  { cursus_user: { user_id, cursus_id, begin_at }} body
   * @returns Promise
   */
  async post (body: any): Promise<void> {
    await this.client.post('cursus_users', body)
  }
}
