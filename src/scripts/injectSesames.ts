// It's better to run this script when your sesames got their badge back so you know exactly who they are.

import { type Client } from '../structures/Client'
import { script } from './_scripts'
import { type ProjectUser } from '../structures/ProjectUser'

// TODO: passed as parameters
const CURSUS_ID = 9 // c-piscine
const POOL_MONTH = 'january'
const POOL_YEAR = '2024'
const BEGIN_AT = '2024-01-22 00:00:00 UTC'
const END_AT = '2024-02-09 20:00:00 UTC'
const RETRIABLE_PROJECTS = [
  // { slug: "c-piscine-rush-02", force: false },
  // { slug: "c-piscine-bsq", force: false },
  // { slug: "c-piscine-exam-02", force: false },
  { slug: 'c-piscine-final-exam', force: true } // TODO IF ! PENDING !
]

const injectSesame = async (login: string, client: Client): Promise<void> => {
  // fetch user
  console.info(`Fetching user '${login}'..`)
  const user = await client.users.get(login)

  if (user == null) {
    throw new Error(`User '${login}' not found`)
  }

  // get the right cursus user
  const cursusUser = user.cursus_users.find(c => c.cursus_id === CURSUS_ID)

  if (cursusUser == null) {
    throw new Error(`Cursus '${CURSUS_ID}' not found for user '${login}'`)
  }

  // update cursus end_date
  console.info(`Updating user '${login}' cursus end date..`)
  await client.cursus_users.put(cursusUser.id, { cursus_user: { end_at: END_AT } })

  // set a retriable date for projects that were already tried (user then have to manually retry)
  const retriableProjectsUsers: ProjectUser[] = user.projects_users.filter((pu) => RETRIABLE_PROJECTS.map(p => p.slug).includes(pu.project.slug))

  await Promise.allSettled(retriableProjectsUsers.map(async pu => {
    console.info(`Updating user '${login}' project '${pu.project.slug}' retriable date..`)
    await client.projects_users.put(pu.id, { projects_user: { retriable_at: BEGIN_AT } })
  }))

  // force retry projects
  const forceRetryProjectsUsers: ProjectUser[] = user.projects_users.filter((pu) => RETRIABLE_PROJECTS.filter(p => p.force).map(p => p.slug).includes(pu.project.slug))

  await Promise.allSettled(forceRetryProjectsUsers.map(async pu => {
    console.info(`Updating user '${login}' forcing project '${pu.project.slug}' to be retried..`)
    await client.projects_users.retry(pu.id, true)
  }))

  // update pool month & year (mostly to appear in DEWEY)
  console.info(`Updating user '${login}' pool month -> '${POOL_MONTH}' & year -> '${POOL_YEAR}'`)
  await client.users.put(login, { user: { pool_month: POOL_MONTH, pool_year: POOL_YEAR } })

  console.log(`${login} DONE`)
}

export const injectSesames = async (logins: string[], client: Client): Promise<PromiseSettledResult<void>[]> => {
  return await Promise.allSettled(logins.map(async login => { await injectSesame(login, client) }))
}

void script(injectSesames)
