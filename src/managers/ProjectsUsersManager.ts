import { BaseManager } from "./BaseManager";
import { Client } from "../structures/Client";
import { ProjectUser, IProjectUser } from "../structures/ProjectUser";

export class ProjectsUsersManager extends BaseManager {
	constructor(client: Client) {
		super(client);
	}

	/**
	 * Look for an array of projects_users
	 * @param  {{limit?:number;params:string[]}} options?
	 * @returns Promise
	 */
	async fetch(options?: { limit?: number; params: string[] }): Promise<ProjectUser[]> {
		const res = await this.client.fetch(
			"projects_users/?" + options?.params.join("&"),
			options?.limit
		);
		return res.map(pu => new ProjectUser(<IProjectUser> pu));
	}

	/**
	 * Look for one projects_user by id
	 * @param  {string} id
	 * @returns Promise
	 */
	async get(id: string): Promise<ProjectUser | null> {
		const res = await this.client.get("projects_users/" + id);
		if (res === null) return null;
		return new ProjectUser(res?.data);
	}

	/**
	 * Look for one projects_user by id
	 * @param  {number} id
	 * @returns Promise
	 */
	async put(id: number, body: any): Promise<ProjectUser | null> {
		const res = await this.client.put("projects_users/" + id, body);
		return null;
	}

	async retry(id: number, force: boolean = false) { return this.client.put("projects_users/" + id + "/retry?force=" + force) }

}
