import { BaseManager } from "./BaseManager";
import { Client } from "../structures/client";
import { ProjectsUsers, IProjectsUsers } from "../structures/projects_users";

export class ProjectsUsersManager extends BaseManager {
	constructor(client: Client) {
		super(client);
	}

	/**
	 * Look for an array of projects_users
	 * @param  {{limit?:number;params:string[]}} options?
	 * @returns Promise
	 */
	async fetch(options?: { limit?: number; params: string[] }): Promise<ProjectsUsers[]> {
		const res = await this.client.fetch(
			"projects_users/?" + options?.params.join("&"),
			options?.limit
		);
		return res.map((u) => new ProjectsUsers(this.client, <IProjectsUsers>u));
	}

	/**
	 * Look for one projects_user by id
	 * @param  {string} id
	 * @returns Promise
	 */
	async get(id: string): Promise<ProjectsUsers | null> {
		const res = await this.client.get("projects_users/" + id);
		if (res === null) return null;
		return new ProjectsUsers(this.client, res?.data);
	}

	/**
	 * Look for one projects_user by id
	 * @param  {number} id
	 * @returns Promise
	 */
	async put(id: number, body: any): Promise<ProjectsUsers | null> {
		const res = await this.client.put("projects_users/" + id, body);
		return null;
	}
}
