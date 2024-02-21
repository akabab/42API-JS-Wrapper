import fs from 'fs'
import axios from 'axios'
import { type Client } from '../structures/Client'
import { script } from './_scripts'

const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

const downloadUserPicture = async (login: string, dirPath: string, client: Client): Promise<void> => {
  console.info(`Fetching user '${login}'..`)
  const user = await client.users.get(login)

  if (user == null) {
    throw new Error(`User '${login}' not found`)
  }

  const url = user.image.link

  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  })

  const urlParts = url.split('/')
  const fileName = urlParts[urlParts.length - 1]
  const filePath = dirPath + '/' + fileName

  await fs.promises.writeFile(filePath, Buffer.from(response.data as string, 'binary'))
  console.log(`${login} Image saved successfully at ${filePath}`)
}

export const downloadUsersPictures = async (logins: string[], client: Client): Promise<PromiseSettledResult<void>[]> => {
  const dirPath = process.argv[3] ?? '/tmp/' + generateRandomString(10)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  return await Promise.allSettled(logins.map(async login => { await downloadUserPicture(login, dirPath, client) }))
}

void script(downloadUsersPictures)
