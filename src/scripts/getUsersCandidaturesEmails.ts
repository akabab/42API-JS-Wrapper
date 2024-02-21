import { type UserCandidature } from '../structures/UserCandidature'
import { type Client } from '../structures/Client'
import { script } from './_scripts'

const getUserCandidatureEmail = async (login: string, client: Client): Promise<UserCandidature> => {
  console.info(`Fetching user '${login}'..`)
  const uc = await client.users.getUserCandidature(login)

  if (uc == null) {
    throw new Error(`User '${login}' not found`)
  }

  console.log(`${login},${uc.email}`)

  return uc
}

export const getUsersCandidaturesEmails = async (logins: string[], client: Client): Promise<PromiseSettledResult<void>[]> => {
  return await Promise.allSettled(logins.map(async login => { await getUserCandidatureEmail(login, client) }))
}

void script(getUsersCandidaturesEmails)
