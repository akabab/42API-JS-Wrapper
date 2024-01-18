import { BaseManager } from "./BaseManager";
import { Client } from "../structures/client";
import { CursusUsers, ICursusUsers } from "../structures/cursus_users";

export class CursusUsersManager extends BaseManager {
	constructor(client: Client) {
		super(client);
	}

	/**
	 * Look for an array of cursus_users
	 * @param  {{limit?:number;params:string[]}} options?
	 * @returns Promise
	 */
	async fetch(options?: { limit?: number; params: string[] }): Promise<CursusUsers[]> {
		const res = await this.client.fetch(
			"cursus_users/?" + options?.params.join("&"),
			options?.limit
		);
		return res.map((u) => new CursusUsers(this.client, <ICursusUsers>u));
	}

	/**
	 * Look for one cursus_user by id
	 * @param  {string} id
	 * @returns Promise
	 */
	async get(id: string): Promise<CursusUsers | null> {
		const res = await this.client.get("cursus_users/" + id);
		if (res === null) return null;
		return new CursusUsers(this.client, res?.data);
	}

	/**
	 * Look for one cursus_user by id
	 * @param  {number} id
	 * @returns Promise
	 */
	async put(id: number, body: any): Promise<CursusUsers | null> {
		const res = await this.client.put("cursus_users/" + id, body);
		return null;
	}
}
