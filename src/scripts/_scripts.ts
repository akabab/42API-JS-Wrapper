import fs from 'fs'
import { Client } from '../structures/Client'
import { die } from '../utils/utils'
import 'dotenv/config'

export const G_ERRORS = {
  MISSING_ENV_42_API_CREDENTIALS: 'MISSING CREDENTIALS 42_API_ID & 42_API_SECRET ENV VARIABLES',
  USAGE: `Usage: ./${process.title} <LOGINS_FILE_PATH>`
}

const handleResultsErrors = (results: PromiseSettledResult<void>[]): void => {
  const errors: Error[] = []

  results.forEach(res => {
    if (res.status === 'rejected') {
      if (res.reason.request != null && res.reason.response != null) {
        const { method, path } = res.reason.request
        const { status, statusText, data } = res.reason.response

        console.error(method, path, status, statusText, data)
      }
      errors.push(Error(res.reason as string))
    }
  })
  console.info(`${results.length - errors.length} treated successfully`)
  console.info(`${errors.length} errors encountered`)

  errors.forEach(e => { console.log(e.message) })
}

export const script = async (_do: (logins: string[], client: Client) => Promise<PromiseSettledResult<void>[]>): Promise<void> => {
  const ID = process.env.ID ?? die(G_ERRORS.MISSING_ENV_42_API_CREDENTIALS)
  const SECRET = process.env.SECRET ?? die(G_ERRORS.MISSING_ENV_42_API_CREDENTIALS)
  const client = new Client(ID, SECRET)

  const LOGINS_FILE_PATH = process.argv[2] ?? die(G_ERRORS.USAGE)

  const logins = fs.readFileSync(LOGINS_FILE_PATH).toString().split('\n')

  await _do(logins, client).then(handleResultsErrors)
}
