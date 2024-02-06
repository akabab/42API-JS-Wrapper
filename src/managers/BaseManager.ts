import { Client } from "../structures/Client";

export class BaseManager {
	protected client: Client;

	constructor(client: Client) {
		this.client = client;
	}
}
