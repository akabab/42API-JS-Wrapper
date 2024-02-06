import { User } from "./User";
import { Event } from "./Event";

export interface IEventUser {
	id: number;
	user: User;
	event: Event;
}

export class EventUser implements IEventUser {
	id: number;
	user: User;
	event: Event;

	constructor(data: IEventUser) {
		this.id = data.id;
		this.user = data.user;
		this.event = data.event;
	}
}
