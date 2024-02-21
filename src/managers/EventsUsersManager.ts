import { BaseManager } from './BaseManager'
import { EventUser, type IEventUser } from '../structures/EventUser'

export class EventsUsersManager extends BaseManager {
  async fetch (
    eventId: number,
    options?: { limit?: number, params: string[] }
  ): Promise<EventUser[]> {
    const res = await this.client.fetch(
      'events/' + eventId + '/events_users/?' + options?.params.join('&'),
      options?.limit
    )
    return res.map((eu) => new EventUser(eu as IEventUser))
  }
}
