import { BaseManager } from './BaseManager'
import { Campus, type ICampus } from '../structures/Campus'

export class CampusManager extends BaseManager {
  async get (campusId: number): Promise<Campus | null> {
    const res = await this.client.get('campus/ ' + campusId)

    return res?.data != null ? new Campus(res.data as ICampus) : null
  }
}
