import { BaseManager } from './BaseManager'
import { User, type IUser } from '../structures/User'
import { UserCandidature, type IUserCandidature } from '../structures/UserCandidature'

export class UsersManager extends BaseManager {
  /**
   * Look for an array of users
   * @param  {{limit?:number;params:string[]}} options?
   * @returns Promise
   */
  async fetch (options?: { limit?: number, params: string[] }): Promise<User[]> {
    const res = await this.client.fetch(
      'users/?' + options?.params.join('&'),
      options?.limit
    )
    return res.map(user => new User((user as IUser)))
  }

  /**
   * Look for one user
   * @param  {number | string} idOrSlug
   * @returns Promise
   */
  async get (idOrSlug: number | string): Promise<User | null> {
    const res = await this.client.get('users/' + idOrSlug)

    return res?.data != null ? new User(res.data as IUser) : null
  }

  /**
   * Get User Candidature for one user
   * @param  {string} login
   * @returns Promise
   */
  async getUserCandidature (login: string): Promise<UserCandidature | null> {
    const res = await this.client.get('users/' + login + '/user_candidature')

    return res?.data != null ? new UserCandidature(res.data as IUserCandidature) : null
  }

  /**
   * Update one User
   * @param  {number | string} idOrSlug
   * @returns Promise
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async put (idOrSlug: number | string, body?: any, config?: any) {
    return await this.client.put('users/' + idOrSlug, body, config)
  }
}
