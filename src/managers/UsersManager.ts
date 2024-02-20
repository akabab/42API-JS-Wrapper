import { BaseManager } from "./BaseManager";
import { Client } from "../structures/Client";
import { User, IUser } from "../structures/User";
import { UserCandidature, IUserCandidature } from "../structures/UserCandidature";

export class UsersManager extends BaseManager {
	constructor(client: Client) {
		super(client);
	}

	/**
	 * Look for an array of users
	 * @param  {{limit?:number;params:string[]}} options?
	 * @returns Promise
	 */
	async fetch(options?: { limit?: number; params: string[] }): Promise<User[]> {
		const res = await this.client.fetch(
			"users/?" + options?.params.join("&"),
			options?.limit
		);
		return res.map(user => new User(<IUser> user));
	}

	/**
	 * Look for one user
	 * @param  {number | string} idOrSlug
	 * @returns Promise
	 */
	async get(idOrSlug: number | string): Promise<User | null> {
		const res = await this.client.get("users/" + idOrSlug);

		return res && new User(res.data);
	}

	/**
		 * Get User Candidature for one user
		 * @param  {string} login
		 * @returns Promise
		 */
	async getUserCandidature(login: string): Promise<UserCandidature | null> {
		const res = await this.client.get("users/" + login + "/user_candidature");

		return res && new UserCandidature(res.data);
	}

	/**
	 * Update one User
	 * @param  {number | string} idOrSlug
	 * @returns Promise
	 */
	async put(idOrSlug: number | string, body?: any, config?: any) {
		return this.client.put("users/" + idOrSlug, body, config);
	}
}
