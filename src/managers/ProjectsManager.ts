import { BaseManager } from './BaseManager'
import { Project, type IProject } from '../structures/Project'

export class ProjectsManager extends BaseManager {
  /**
   * Look for an array of projects
   * @param  {{limit?:number;params:string[]}} options?
   * @returns Promise
   */
  async fetch (options?: {
    limit?: number
    params: string[]
  }): Promise<IProject[]> {
    const res = await this.client.fetch(
      'projects/?' + options?.params.join('&'),
      options?.limit
    )
    return res.map((p) => new Project((p as IProject)))
  }

  /**
   * @param  {number|string} target id | slug
   * @returns Promise
   */
  async get (target: number | string): Promise<Project | null> {
    const res = await this.client.get('projects/' + target)

    return res?.data != null ? new Project(res.data as IProject) : null
  }
}
