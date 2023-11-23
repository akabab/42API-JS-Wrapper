import { User } from "./user";
import { Exam } from "./exams";

export interface IExamUser {
	id: number;
	user: User;
	exam: Exam;
}

export class ExamsUsers implements IExamUser {
	id: number;
	user: User;
	exam: Exam;

	constructor(data: IExamUser) {
		this.id = data.id;
		this.user = data.user;
		this.exam = data.exam;
	}
}
