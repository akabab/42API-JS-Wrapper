import { BaseManager } from './BaseManager'
import { ScaleTeam, type IScaleTeam } from '../structures/ScaleTeam'

export class ScaleTeamsManager extends BaseManager {
  /**
   * Look for an array of scale teams
   * @param  {{limit?:number;params:string[]}} options?
   * @returns Promise
   */
  async fetch (options?: { limit?: number, params: string[] }): Promise<ScaleTeam[]> {
    const res = await this.client.fetch(
      'scale_teams/?' + options?.params.join('&'),
      options?.limit
    )
    return res.map((o) => new ScaleTeam((o as IScaleTeam)))
  }

  /**
   * Look for one scale team
   * @param  {string} id
   * @returns Promise
   */
  async get (id: number): Promise<ScaleTeam | null> {
    const res = await this.client.get('scale_teams/' + id)

    return res?.data != null ? new ScaleTeam(res.data as IScaleTeam) : null
  }
}
