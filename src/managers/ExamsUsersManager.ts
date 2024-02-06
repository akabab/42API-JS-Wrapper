import { BaseManager } from "./BaseManager";
import { Client } from "../structures/Client";
import { ExamUser, IExamUser } from "../structures/ExamUser";

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
    return res.map((eu) => new ExamUser(<IExamUser> eu));
  }

  /**
   * Look for one exams_users by id
   * @param  {string} id
   * @returns Promise
   */
  async get(id: string): Promise<ExamUser | null> {
    const res = await this.client.get("exams_users/" + id);
    if (res === null) return null;
    return new ExamUser(res?.data);
  }

  /**
   * Update one exam user by id
   * @param  {number} id
   * @param  {any} body
   * @returns Promise
   */
  async put(id: number, body: any): Promise<ExamUser | null> {
    const res = await this.client.put("exams_users/" + id, body);
    return null;
  }

  /**
   * Create an exam user for a given exam
   * @param  {number} exam_id
   * @param  {number} user_id
   * @returns Promise
   */
  async post(exam_id: number, user_id: number) {
    return this.client.post("exams/" + exam_id + "/exams_users", {
      "exams_user": {
        "user_id": user_id
      }
    }) }
}
