import { BaseManager } from './BaseManager'
import { ProjectUser, type IProjectUser } from '../structures/ProjectUser'

export class ProjectsUsersManager extends BaseManager {
  /**
   * Look for an array of projects_users
   * @param  {{limit?:number;params:string[]}} options?
   * @returns Promise
   */
  async fetch (options?: { limit?: number, params: string[] }): Promise<ProjectUser[]> {
    const res = await this.client.fetch(
      'projects_users/?' + options?.params.join('&'),
      options?.limit
    )
    return res.map(pu => new ProjectUser(pu as IProjectUser))
  }

  /**
   * Look for one projects_user by id
   * @param  {string} id
   * @returns Promise
   */
  async get (id: string): Promise<ProjectUser | null> {
    const res = await this.client.get('projects_users/' + id)

    return res?.data != null ? new ProjectUser(res.data as IProjectUser) : null
  }

  /**
   * Look for one projects_user by id
   * @param  {number} id
   * @returns Promise
   */
  async put (id: number, body: any): Promise<void> {
    await this.client.put('projects_users/' + id, body)
  }

  /**
   * Retry of project for a specific project_user id
   * @param  {number} projectUserId
   * @param  {boolean} [force=false]
   * @returns Promise
   */
  async retry (projectUserId: number, force: boolean = false): Promise<void> {
    await this.client.put('projects_users/' + projectUserId + '/retry?force=' + force)
  }
}
