import { Cursus } from "./Cursus";

export interface ICursusUser {
	id: number,
	cursus_id: number,
	grade: string,
	level: number,
	skills: Object[],
	blackholed_at: Date,
	begin_at: Date,
	end_at: Date,
	has_coalition: boolean,
	created_at: Date,
	updated_at: Date,
	cursus: Cursus
}

export class CursusUser implements ICursusUser {
	id: number;
	cursus_id: number;
	grade: string;
	level: number;
	skills: Object[];
	blackholed_at: Date;
	begin_at: Date;
	end_at: Date;
	has_coalition: boolean;
	created_at: Date;
	updated_at: Date;
	cursus: Cursus;

	constructor(data: ICursusUser) {
		this.id = data.id;
		this.cursus_id = data.cursus_id;
		this.grade = data.grade;
		this.level = data.level;
		this.skills = data.skills;
		this.blackholed_at = data.blackholed_at;
		this.begin_at = data.begin_at;
		this.end_at = data.end_at;
		this.has_coalition = data.has_coalition;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.cursus = data.cursus;
	}
}
