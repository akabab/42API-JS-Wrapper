import fs from 'fs';
import path from 'path';
import { Client, User } from "./index";
import axios, { AxiosResponse } from "axios";
import "dotenv/config";

const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const downloadUserPicture = async (login: string, dirPath: string, client: Client) => {
  // fetch user
  console.info(`Fetching user '${login}'..`)
  const user = await client.users.get(login)

  if (!user) {
    throw new Error(`User '${login}' not found`);
  }

  const url = user.image.link

  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });

  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];
  const filePath = dirPath + '/' + fileName;

  fs.promises.writeFile(filePath, Buffer.from(response.data, 'binary'));
    console.log(`${login} Image saved successfully at ${filePath}`);
}

const main = async () => {
  const LOGINS = fs.readFileSync(process.argv[2]).toString().split("\n");
  const dirPath = process.argv[3] || '/tmp/' + generateRandomString(10);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

	const client = new Client(
		<string> process.env.ID,
		<string> process.env.SECRET,
	);

	const ERRORS: Error[] = []
	const results = await Promise.allSettled(LOGINS.map(login => downloadUserPicture(login, dirPath, client)));
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
