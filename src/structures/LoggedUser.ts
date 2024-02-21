import { type AxiosResponse } from 'axios'
import { Client } from './Client'
import { type IUser, User } from './User'

export class LoggedUser extends User {
  private readonly _client: Client
  private readonly _refresh_token: string
  private _token: string
  private readonly _id: string
  private readonly _secret: string

  constructor (
    client: Client,
    data: IUser,
    refreshToken: string,
    token: string,
    id: string,
    secret: string
  ) {
    super(data)
    this._client = client
    this._refresh_token = refreshToken
    this._token = token
    this._id = id
    this._secret = secret
  }

  private async _getToken (): Promise<string | null> {
    try {
      const ret = await this._client.get('/oauth/token/info', this._token)
      if (ret?.data.expires_in_seconds < 10) {
        const params = {
          grant_type: 'refresh_token',
          client_id: this._id,
          client_secret: this._secret,
          refresh_token: this._refresh_token
        }
        const response: any = await this._client.post(
          'oauth/token',
          params
        )
        if (Client.activeDebug) { console.log(`User ${this.login} token refreshed`) }
        this._token = response?.access_token
      }
    } catch (err: any) {
      console.error(
        err.response.status,
        err.response.statusText,
        err.response.data
      )
      return null
    }
    return this._token
  }

  async get (path: string): Promise<AxiosResponse<any, any> | null> {
    return await this._client.get(path, (await this._getToken()) ?? '')
  }

  async fetch (path: string, limit: number = 0): Promise<object[]> {
    return await this._client.fetch(path, limit, (await this._getToken()) ?? '')
  }

  async post (path: string, data: any): Promise<void> {
    await this._client.post(path, data, (await this._getToken()) ?? '')
  }

  async delete (path: string): Promise<void> {
    await this._client.delete(path, (await this._getToken()) ?? '')
  }
}
