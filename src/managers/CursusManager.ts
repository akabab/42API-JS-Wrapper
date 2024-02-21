import { BaseManager } from './BaseManager'
import { Cursus, type ICursus } from '../structures/Cursus'

export class CursusManager extends BaseManager {
  /**
   * Look for an array of cursus
   * @param  {{limit?:number;params:string[]}} options?
   * @returns Promise
   */
  async fetch (options?: {
    limit?: number
    params: string[]
  }): Promise<Cursus[]> {
    const res = await this.client.fetch(
      'cursus/?' + options?.params.join('&'),
      options?.limit
    )
    return res.map((u) => new Cursus((u as ICursus)))
  }

  /**
   * @param  {number|string} target id | slug
   * @returns Promise
   */
  async get (target: number | string): Promise<Cursus | null> {
    const res = await this.client.get('cursus/' + target)

    return res?.data != null ? new Cursus(res.data as ICursus) : null
  }
}
