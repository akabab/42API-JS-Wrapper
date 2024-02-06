 // It's better to run this script when your sesames got their badge back so you know exactly who they are.

import "dotenv/config";
import { readFileSync } from 'fs';
import { Client, User } from "./index";
import { ProjectUser } from "./structures/ProjectUser";

const path = process.argv[2];

const LOGINS = readFileSync(path).toString().split("\n");
// TODO: passed as parameters
const CURSUS_ID = 9 // c-piscine
const POOL_MONTH = 'january'
const POOL_YEAR = '2024'
const BEGIN_AT = "2024-01-22 00:00:00 UTC";
const END_AT = "2024-02-09 20:00:00 UTC";
const RETRIABLE_PROJECTS = [
	// { slug: "c-piscine-rush-02", force: false },
	// { slug: "c-piscine-bsq", force: false },
	// { slug: "c-piscine-exam-02", force: false },
	{ slug: "c-piscine-final-exam", force: true }, // TODO IF ! PENDING !
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

	// set a retriable date for projects that were already tried (user then have to manually retry)
	const retriableProjectsUsers: ProjectUser[] = user.projects_users.filter((pu) => RETRIABLE_PROJECTS.map(p => p.slug).includes(pu.project.slug))

	await Promise.allSettled(retriableProjectsUsers.map(pu => {
			console.info(`Updating user '${login}' project '${pu.project.slug}' retriable date..`);
			return client.projects_users.put(pu.id, { "projects_user": { "retriable_at": BEGIN_AT } })
		}));

	// force retry projects
	const forceRetryProjectsUsers: ProjectUser[] = user.projects_users.filter((pu) => RETRIABLE_PROJECTS.filter(p => p.force === true).map(p => p.slug).includes(pu.project.slug))

	await Promise.allSettled(forceRetryProjectsUsers.map(pu => {
		console.info(`Updating user '${login}' forcing project '${pu.project.slug}' to be retried..`);
		return client.projects_users.retry(pu.id, true);
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
		if (res.status === "rejected") {
			const { method, path } = res.reason.request;
			const { status, statusText, data } = res.reason.response;

			console.error(method, path, status, statusText, data);
			ERRORS.push(Error(res.reason))
		}
	})
	console.info(`${LOGINS.length - ERRORS.length} users successfully updated`);
	console.info(`${ERRORS.length} errors encountered`);

	ERRORS.forEach(e => console.log(e.message))
}

main()
