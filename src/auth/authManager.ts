import { Client } from '../structures/Client'
import { createApp } from './authServer'
import { LoggedUser } from '../structures/LoggedUser'
import type { IUser } from '../structures/User'

export class AuthProcess {
  id: number
  callback_url: string
  url: string
  server: any | null = null

  constructor (callbackUrl: string, url: string) {
    this.id = Math.floor(Math.random() * 1000000)
    this.callback_url = callbackUrl
    this.url = url
  }
}

export class AuthManager {
  private _auth_processes: AuthProcess[] = []
  private readonly _logged_users: LoggedUser[] = []
  private readonly _client: Client
  private readonly _id: string
  private readonly _secret: string

  constructor (client: Client, id: string, secret: string) {
    this._client = client
    this._id = id
    this._secret = secret
  }

  /**
    * Start an auth process to let user connect via 42 account
    * @param  {string} callbackUrl URL where the callback will be sent
    * @param  {string[]} scopes Requested scopes for the user
    * @param  {{port: number, redirect_url?: string, callback_function?: (arg0: LoggedUser) => void}} server If set, an automatic auth server will be created
    * @returns The promise to the AuthProcess object associated or null if an error occured
    */
  async init_auth_process (
    callbackUrl: string,
    scopes?: string[],
    server?: {
      port: number
      redirect_url?: string
      callback_function?: (arg0: LoggedUser) => void
    }
  ): Promise<AuthProcess | null> {
    if (scopes != null && !scopes?.includes('public')) scopes.push('public')
    const params = {
      client_id: this._id,
      redirect_uri: callbackUrl,
      response_type: 'code',
      scope: scopes?.join(' ') ?? 'public'
    }
    const urlSearchParams = new URLSearchParams(params)
    const url = `${Client.uri}oauth/authorize?${urlSearchParams.toString()}`
    const authProcess = new AuthProcess(callbackUrl, url)
    if (server != null) {
      const app = createApp(server, this, authProcess.id)
      try {
        authProcess.server = await app.listen(server.port, () => {
          if (Client.activeDebug) {
            console.log(
              'Auth server started on port ' + server.port
            )
          }
        })
      } catch (error) {
        console.error('Unable to start auth server', error)
        return null
      }
    }
    this._auth_processes.push(authProcess)
    return authProcess
  }

  /**
    * Treat response of an auth request (call only if you don't use an automatic server)
    * @param  {number} processId The id of the AuthProcess object
    * @param  {string} code The returned code by 42
    */
  async response_auth_process (
    processId: number,
    code: string
  ): Promise<LoggedUser | null> {
    const process = this._auth_processes.find((p) => p.id === processId)
    if (process === undefined) throw new Error('Invalid process id')
    const params = {
      grant_type: 'authorization_code',
      client_id: this._id,
      client_secret: this._secret,
      code,
      redirect_uri: process.callback_url
    }
    const response: any = await this._client.post('oauth/token', params)
    if (response == null) return null
    try {
      const ret = await this._client.get('/me', response?.access_token)
      if (ret?.data == null || response.refresh_token == null || response.access_token == null) {
        throw new Error('Invalid data')
      }

      const loggedUser = new LoggedUser(
        this._client,
        ret.data as IUser,
        response.refresh_token as string,
        response.access_token as string,
        this._id,
        this._secret
      )
      this._logged_users.push(loggedUser)
      if (Client.activeDebug) { console.log(`User ${loggedUser.login} finished auth process`) }
      return loggedUser
    } catch (err: any) {
      if (Client.activeDebug) console.log('Unable to log user', err)
      console.error(
        err.response.status,
        err.response.statusText,
        err.response.data
      )
      return null
    }
  }

  /**
    * Stop an auth process and close the server if it was created
    * @param  {number} processId The id of the AuthProcess object
    */
  async stopAuthProcess (processId: number): Promise<void> {
    const process = this._auth_processes.find((p) => p.id === processId)
    if (process === undefined) throw new Error('Invalid process id')
    if (process.server != null) await process.server.close()
    this._auth_processes = this._auth_processes.filter(
      (p) => p.id !== processId
    )
    if (Client.activeDebug) console.log('Auth process stopped')
  }
}
