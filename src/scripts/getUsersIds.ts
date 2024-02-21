import { type Client } from '../structures/Client'
import { script } from './_scripts'

const getUserId = async (login: string, client: Client): Promise<number> => {
  console.info(`Fetching user '${login}'..`)
  const user = await client.users.get(login)

  if (user == null) {
    throw new Error(`User '${login}' not found`)
  }

  console.log(`${user.id},${login}`)

  return user.id
}

export const getUsersIds = async (logins: string[], client: Client): Promise<PromiseSettledResult<void>[]> => {
  return await Promise.allSettled(logins.map(async login => { await getUserId(login, client) }))
}

void script(getUsersIds)
