import { BaseManager } from "./BaseManager";
import { Client } from "../structures/client";
import { Exam, IExam } from "../structures/exams";

export class ExamsManager extends BaseManager {
	constructor(client: Client) {
		super(client);
	}

	async get(target: number): Promise<Exam | null> {
		const res = await this.client.get("exams/" + target);
		return new Exam(this.client, res?.data);
	}

	async fetch(options?: {
		limit?: number;
		params?: string[];
	}): Promise<Exam[]> {
		const res = await this.client.fetch(
			"exams/?" + options?.params?.join("&"),
			options?.limit
		);
		return res.map((e) => new Exam(this.client, <IExam>e));
	}
}
