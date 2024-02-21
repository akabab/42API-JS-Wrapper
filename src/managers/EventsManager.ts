import { BaseManager } from './BaseManager'
import { Event, type IEvent } from '../structures/Event'

export class EventsManager extends BaseManager {
  async get (target: number): Promise<Event | null> {
    const res = await this.client.get('events/' + target)

    return res?.data != null ? new Event(res.data as IEvent) : null
  }

  async fetch (options?: {
    limit?: number
    params?: string[]
  }): Promise<Event[]> {
    const res = await this.client.fetch(
      'events/?' + options?.params?.join('&'),
      options?.limit
    )
    return res.map((e) => new Event(e as IEvent))
  }
}
