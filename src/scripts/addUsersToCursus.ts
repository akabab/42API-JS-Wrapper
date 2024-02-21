import { type Client } from '../structures/Client'
import { script } from './_scripts'
import { die } from '../utils/utils'

const addCursusUser = async (login: string, cursusId: number, beginAt: string, client: Client): Promise<void> => {
  console.info(`Fetching user '${login}'..`)
  const user = await client.users.get(login)

  if (user == null) {
    throw new Error(`User '${login}' not found`)
  }

  if (user.cursus_users.some(c => c.cursus_id === cursusId)) {
    throw new Error(`Cursus '${cursusId}' already exists for user '${login}'`)
  }

  await client.cursus_users.post({ cursus_user: { user_id: user.id, cursus_id: cursusId, begin_at: beginAt } })
  console.info(`[${login}] cursus '${cursusId}' added starting at ${beginAt}`)
}

export const addUsersToCursus = async (logins: string[], client: Client): Promise<PromiseSettledResult<void>[]> => {
  if (process.argv[3] == null || isNaN(Number(process.argv[3]))) {
    die('missing or invalid CURSUS_ID')
  }
  const cursusId = Number(process.argv[3])
  const beginAt = process.argv[4] ?? (new Date()).toISOString()

  return await Promise.allSettled(logins.map(async login => { await addCursusUser(login, cursusId, beginAt, client) }))
}

void script(addUsersToCursus)
