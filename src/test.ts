import "dotenv/config";
import { readFileSync } from 'fs';
import { Client, User } from "./index";

const path = process.argv[2];
const examId = Number(process.argv[3]);

const examMasterUsersLogins = readFileSync(path).toString().split("\n");

const main = async () => {
  const client = new Client(
    <string> process.env.ID,
    <string> process.env.SECRET,
  );

	const examEventUsers = await client.exams_users.fetch(examId);
	const examEventUsersLogins = examEventUsers.map(s => s.user.login);

	const res = examEventUsers
		.filter(s => !examMasterUsersLogins.includes(s.user.login))
	console.log(res.map(s => [s.id, s.user.login, s.user.id]));
}

main()