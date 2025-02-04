import express from 'express'
import { type LoggedUser } from '../structures/LoggedUser'
import { type AuthManager } from './authManager'

export function createApp (server: { port: number, redirect_url?: string, callback_function?: (arg0: LoggedUser) => void }, authManager: AuthManager, authProcessId: number): any {
  const app = express()
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.get('/callback', async (req, res) => {
    if (req.query.error != null) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
      if (server.redirect_url != null) { res.redirect(`${server.redirect_url}?status=error&error=${req.query.error}&error_description=${req.query.error_description}`) } else { res.status(401).send(`Unable to log: ${req.query.error_description}`) }
    } else {
      if (req.query.code != null) {
        const loggedUser = await authManager.response_auth_process(authProcessId, req.query.code as string)
        if (loggedUser != null) {
          if (server.redirect_url != null) { res.redirect(server.redirect_url + '?status=success') } else { res.status(200).send('Successfully logged in') }
          if (server.callback_function != null) { server.callback_function(loggedUser) }
        } else {
          if (server.redirect_url != null) { res.redirect(server.redirect_url + '?status=error&error=no-code' + '&error_description=There+was+an+error+while+logging+in') } else { res.status(500).send('Unable to log: There was an error while logging in') }
        }
      } else {
        if (server.redirect_url != null) { res.redirect(server.redirect_url + '?status=error&error=no-code' + '&error_description=No+code+were+provided+by+42') } else { res.status(400).send('Unable to log: No code were provided by 42') }
      }
    }
  })
  return app
}
