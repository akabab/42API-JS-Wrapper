import { BaseManager } from "./BaseManager";
import { Client } from "../structures/client";
import { ExamsUsers, IExamUser } from "../structures/exams_users";

export class ExamsUsersManager extends BaseManager {
  constructor(client: Client) {
    super(client);
  }

  async fetch(
    exam_id: number,
    options?: { limit?: number; params: string[] },
  ) {
    const res = await this.client.fetch(
      "exams/" + exam_id + "/exams_users/?" + options?.params.join("&"),
      options?.limit,
    );
    return res.map((eu) => new ExamsUsers(<IExamUser> eu));
  }
}
