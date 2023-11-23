import { BaseManager } from "../managers/BaseManager";
import { Client } from "./client";
import { ICampus } from "./campus";

export interface IExam {
  id: number;
  name: string;
  begin_at: Date;
  end_at: Date;
  location: string;
  ip_range: string;
  max_people: number;
  nbr_subscribers: number;
  created_at: Date;
  updated_at: Date;
  campus: ICampus;
  // cursus: Cursus[];
  // projects: Project[];
}

export class Exam extends BaseManager implements IExam  {
	id: number;
	name: string;
	begin_at: Date;
	end_at: Date;
	location: string;
	ip_range: string;
	max_people: number;
	nbr_subscribers: number;
	created_at: Date;
	updated_at: Date;
	campus: ICampus;
	// cursus: Cursus[];
	// projects: Project[];

	constructor(client: Client, data: IExam) {
		super(client);
		this.id = data.id;
		this.name = data.name;
		this.ip_range = data.ip_range;
		this.begin_at = data.begin_at;
		this.end_at = data.end_at;
		this.location = data.location;
		this.max_people = data.max_people;
		this.nbr_subscribers = data.nbr_subscribers;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.campus = data.campus;
		// this.cursus = data.cursus; []
		// this.projects = data.projects; []
	}

	// get feedbacks(): Promise<void | object[]> {
	// 	const ret = this.client
	// 		.fetch("events/" + this.id + "/feedbacks?")
	// 		.catch(console.error);
	// 	return ret;
	// }
}
