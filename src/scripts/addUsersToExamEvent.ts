import { type Client } from '../structures/Client'
import { script } from './_scripts'
import { die } from '../utils/utils'

const addUserToExamEvent = async (login: string, examId: number, client: Client): Promise<void> => {
  console.info(`Fetching user '${login}'..`)
  const user = await client.users.get(login)

  if (user == null) {
    throw new Error(`User '${login}' not found`)
  }

  // subscribe to event
  console.info(`Subscribing user '${login}' to exam ${examId}.. [! To be verified on exam-master]`)
  await client.exams_users.post(examId, user.id)
}

const addUsersToExamEvent = async (logins: string[], client: Client): Promise<PromiseSettledResult<void>[]> => {
  if (process.argv[3] == null || isNaN(Number(process.argv[3]))) {
    die('missing or invalid EXAM_ID')
  }
  const examId = Number(process.argv[3])

  return await Promise.allSettled(logins.map(async login => { await addUserToExamEvent(login, examId, client) }))
}

void script(addUsersToExamEvent)
