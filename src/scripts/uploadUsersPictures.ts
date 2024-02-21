import fs from 'fs'
import FormData from 'form-data'
import { type Client } from '../structures/Client'
import { script } from './_scripts'
import { die } from '../utils/utils'

const uploadUserPicture = async (login: string, dirPath: string, client: Client): Promise<void> => {
  const filePath = dirPath + '/' + login + '.jpg'

  if (!fs.existsSync(filePath)) {
    throw new Error(`File '${filePath}' not found`)
  }

  const pictureStream = fs.createReadStream(filePath)
  const data = new FormData()
  data.append('user[image]', pictureStream)

  await client.users.put(login, data, {
    headers: {
      ...data.getHeaders()
    }
  })
  console.log(`[${login}] profile picture uploaded`)
}

const uploadUsersPictures = async (logins: string[], client: Client): Promise<PromiseSettledResult<void>[]> => {
  const dirPath = process.argv[3] ?? die('missing PICTURES_DIR_PATH')

  return await Promise.allSettled(logins.map(async login => { await uploadUserPicture(login, dirPath, client) }))
}

void script(uploadUsersPictures)
