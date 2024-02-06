import { BaseManager } from "./BaseManager";
import { Cursus, ICursus } from "../structures/Cursus";
import { Client } from "../structures/Client";

export class CursusManager extends BaseManager {
	constructor(client: Client) {
		super(client);
	}

	/**
	 * Look for an array of cursus
	 * @param  {{limit?:number;params:string[]}} options?
	 * @returns Promise
	 */
	async fetch(options?: {
		limit?: number;
		params: string[];
	}): Promise<Cursus[]> {
		const res = await this.client.fetch(
			"cursus/?" + options?.params.join("&"),
			options?.limit
		);
		return res.map((u) => new Cursus(<ICursus>u));
	}

	/**
	 * @param  {number|string} target id | slug
	 * @returns Promise
	 */
	async get(target: number | string): Promise<Cursus | null> {
		const res = await this.client.get("cursus/" + target);
		return new Cursus(res?.data);
	}
}
