import { User } from "./User";
import { Exam } from "./Exam";

export interface IExamUser {
	id: number;
	user: User;
	exam: Exam;
}

export class ExamUser implements IExamUser {
	id: number;
	user: User;
	exam: Exam;

	constructor(data: IExamUser) {
		this.id = data.id;
		this.user = data.user;
		this.exam = data.exam;
	}
}
