import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
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

const uploadUserPicture = async (login: string, dirPath: string, client: Client) => {
  const filePath = dirPath + '/' + login + '.jpg'

  if (!fs.existsSync(filePath)) {
    throw new Error(`File '${filePath}' not found`);
  }

  const pictureStream = fs.createReadStream(filePath);
  const data = new FormData();
  data.append('user[image]', pictureStream);

  console.log(`[${login}] Uploading profile picture ${filePath}`);
  return client.users.put(login, data, {
    headers: {
      ...data.getHeaders()
    }
  });
}

const die = (err: string) => { throw new Error(err) };
const G_ERRORS = {
  USAGE: `Usage: ./${process.title} <LOGINS_FILE_PATH> <PICTURES_DIR_PATH>`
}

const main = async () => {
  const LOGINS_FILE_PATH = process.argv[2] || die(G_ERRORS.USAGE)
  const PICTURES_DIR_PATH = process.argv[3] || die(G_ERRORS.USAGE)

  const LOGINS = fs.readFileSync(LOGINS_FILE_PATH).toString().split("\n");

	const client = new Client(
		<string> process.env.ID,
		<string> process.env.SECRET,
	);

	const ERRORS: Error[] = []
  const results = await Promise.allSettled(LOGINS.map(login => uploadUserPicture(login, PICTURES_DIR_PATH, client)));
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
