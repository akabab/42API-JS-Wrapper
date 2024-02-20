 // It's better to run this script when your sesames got their badge back so you know exactly who they are.

import "dotenv/config";
import { readFileSync } from 'fs';
import { Client, User } from "./index";
import { UserCandidature } from "./structures/UserCandidature";

const getUserCandidatures = async (login: string, client: Client): Promise<UserCandidature> => {
  // fetch user
  console.info(`Fetching user '${login}'..`)
  const uc = await client.users.getUserCandidature(login)

  if (!uc) {
    throw new Error(`User '${login}' not found`);
  }

  console.log(`${login},${uc.email}`);

  return uc;
}

const main = async () => {
  const path = process.argv[2];
  const EXAM_ID = Number(process.argv[3]);
  const LOGINS = readFileSync(path).toString().split("\n");

	const client = new Client(
		<string> process.env.ID,
		<string> process.env.SECRET,
	);

	const ERRORS: Error[] = []
	const results = await Promise.allSettled(LOGINS.map(login => getUserCandidatures(login, client)));
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
