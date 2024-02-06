import { BaseManager } from "./BaseManager";
import { Client } from "../structures/Client";
import { Event, IEvent } from "../structures/Event";

export class EventsManager extends BaseManager {
	constructor(client: Client) {
		super(client);
	}

	async get(target: number): Promise<Event | null> {
		const res = await this.client.get("events/" + target);
		return new Event(res?.data);
	}

	async fetch(options?: {
		limit?: number;
		params?: string[];
	}): Promise<Event[]> {
		const res = await this.client.fetch(
			"events/?" + options?.params?.join("&"),
			options?.limit
		);
		return res.map((e) => new Event(<IEvent>e));
	}
}
