import { BaseManager } from "./BaseManager";
import { Client } from "../structures/Client";
import { EventUser, IEventUser } from "../structures/EventUser";

export class EventsUsersManager extends BaseManager {
  constructor(client: Client) {
    super(client);
  }

  async fetch(
    event_id: number,
    options?: { limit?: number; params: string[] },
  ) {
    const res = await this.client.fetch(
      "events/" + event_id + "/events_users/?" + options?.params.join("&"),
      options?.limit,
    );
    return res.map((eu) => new EventUser(<IEventUser> eu));
  }
}
