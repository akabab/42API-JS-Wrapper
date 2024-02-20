 // It's better to run this script when your sesames got their badge back so you know exactly who they are.

import "dotenv/config";
import { readFileSync } from 'fs';
import { Client, User } from "./index";
import { ProjectUser } from "./structures/ProjectUser";

const path = process.argv[2];

const LOGINS = readFileSync(path).toString().split("\n");
// TODO: passed as parameters
const CURSUS_ID = 21 // 42cursus
const BEGIN_AT = "2024-02-19T8:00:00.000+03:00";

const createCursusUser = async (login: string, client: Client) => {
	// fetch user
	console.info(`Fetching user '${login}'..`)
	const user = await client.users.get(login)

	if (!user) {
		throw new Error(`User '${login}' not found`);
	}

	// get the right cursus user
	const cursusUser = user.cursus_users.find(c => c.cursus_id === CURSUS_ID);

	if (cursusUser) {
		throw new Error(`Cursus '${CURSUS_ID}' already exists for user '${login}'`);
	}

	// update cursus end_date
	console.info(`Add cursus '${CURSUS_ID}' for user '${login}' starting at ${BEGIN_AT}..`);
	await client.cursus_users.post({ "cursus_user": { "user_id": user.id, "cursus_id": CURSUS_ID, "begin_at": BEGIN_AT } });
}

const main = async () => {
	const client = new Client(
		<string> process.env.ID,
		<string> process.env.SECRET,
	);

	// refresh a list of users (sesames)
	const ERRORS: Error[] = []
	const results = await Promise.allSettled(LOGINS.map(login => createCursusUser(login, client)));
	results.forEach(res => {
		if (res.status === "rejected") {
			if (res.reason.request && res.reason.response) {
        const { method, path } = res.reason.request;
        const { status, statusText, data } = res.reason.response;

        console.error(method, path, status, statusText, data);
      }
			ERRORS.push(Error(res.reason))
		}
	})
	console.info(`${LOGINS.length - ERRORS.length} users successfully updated`);
	console.info(`${ERRORS.length} errors encountered`);

	ERRORS.forEach(e => console.log(e.message))
}

main()
