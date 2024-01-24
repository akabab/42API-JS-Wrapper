// It's better to run this script when your sesames got their badge back so you know exactly who they are.

import "dotenv/config";
import { readFileSync } from 'fs';
import { Client, User } from "./index";
import { IProjectsUsers } from "./structures/projects_users";

const path = process.argv[2];

const LOGINS = readFileSync(path).toString().split("\n");
// TODO: passed as parameters
const CURSUS_ID = 9 // c-piscine
const POOL_MONTH = 'january'
const POOL_YEAR = '2024'
const BEGIN_AT = "2024-01-22 00:00:00 UTC";
const END_AT = "2024-02-02 17:00:00 UTC";
const SLUGS = [
	"c-piscine-rush-02",
	"c-piscine-bsq",
	"c-piscine-exam-02",
	"c-piscine-final-exam"
];

const refreshUser = async (login: string, client: Client) => {
	// fetch user
	console.info(`Fetching user '${login}'..`)
	const user = await client.users.get(login)

	if (!user) {
		throw new Error(`User '${login}' not found`);
	}

	// get the right cursus user
	const cursusUser = user.cursus_users.find(c => c.cursus_id === CURSUS_ID);

	if (!cursusUser) {
		throw new Error(`Cursus '${CURSUS_ID}' not found for user '${login}'`);
	}

	// update cursus end_date
	console.info(`Updating user '${login}' cursus end date..`);
	await client.cursus_users.put(cursusUser.id, { "cursus_user": { "end_at": END_AT } });

	// set a retriable date for projects that were already tried
	await Promise.allSettled(user.projects_users
		.filter((pu) => SLUGS.includes(pu.project.slug))
		.map(pu => {
			console.info(`Updating user '${login}' project '${pu.project.slug}' retriable date..`);
			return client.projects_users.put(pu.id, { "projects_user": { "retriable_at": BEGIN_AT } })
		}));

	// update pool month & year (mostly to appear in DEWEY)
	console.info(`Updating user '${login}' pool month -> '${POOL_MONTH}' & year -> '${POOL_YEAR}'`);
	await client.users.put(login, { "user": { "pool_month": POOL_MONTH, "pool_year": POOL_YEAR } });

	console.log(`${login} DONE`)
}

const main = async () => {
	const client = new Client(
		<string> process.env.ID,
		<string> process.env.SECRET,
	);

	// refresh a list of users (sesames)
	const ERRORS: Error[] = []
	const results = await Promise.allSettled(LOGINS.map(login => refreshUser(login, client)));
	results.forEach(res => {
		if (res.status === "rejected")
			ERRORS.push(Error(res.reason))
	})
	console.info(`${LOGINS.length - ERRORS.length} users successfully updated`);
	console.info(`${ERRORS.length} errors encountered`);
	ERRORS.forEach(error => console.error(error.message))
}

main()
