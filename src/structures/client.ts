import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import Bottleneck from 'bottleneck'

import { AuthManager } from '../auth/authManager'
import { Loader } from '../utils/loader'

import { UsersManager } from '../managers/UsersManager'
import { CampusManager } from '../managers/CampusManager'
import { EventsManager } from '../managers/EventsManager'
import { ExamsManager } from '../managers/ExamsManager'
import { EventsUsersManager } from '../managers/EventsUsersManager'
import { ExamsUsersManager } from '../managers/ExamsUsersManager'
import { CursusManager } from '../managers/CursusManager'
import { CursusUsersManager } from '../managers/CursusUsersManager'
import { ProjectsManager } from '../managers/ProjectsManager'
import { ProjectsUsersManager } from '../managers/ProjectsUsersManager'
import { ScaleTeamsManager } from '../managers/ScaleTeamsManager'

const limiter = new Bottleneck({
  maxConcurrent: 8,
  minTime: 500
})

export class Client {
  private readonly _id: string
  private readonly _secret: string
  private _token: null | string = null
  private readonly _auth_manager: AuthManager
  static uri: string = 'https://api.intra.42.fr/v2/'
  static activeDebug: boolean = false

  users = new UsersManager(this)
  campus = new CampusManager(this)
  events = new EventsManager(this)
  exams = new ExamsManager(this)
  events_users = new EventsUsersManager(this)
  exams_users = new ExamsUsersManager(this)
  cursus = new CursusManager(this)
  cursus_users = new CursusUsersManager(this)
  projects = new ProjectsManager(this)
  projects_users = new ProjectsUsersManager(this)
  scale_teams = new ScaleTeamsManager(this)

  constructor (
    id: string,
    secret: string,
    options: { activeDebug: boolean } = { activeDebug: false }
  ) {
    this._id = id
    this._secret = secret
    this._auth_manager = new AuthManager(this, this._id, this._secret)
    if (options.activeDebug) Client.activeDebug = true
  }

  private async _getToken (): Promise<string | null> {
    const headers = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/json'
    }

    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this._id,
      client_secret: this._secret,
      scope: 'public projects profile elearning tig forum'
    }).toString()

    const config = {
      url: `${Client.uri}oauth/token`,
      method: 'POST',
      headers,
      data
    }

    try {
      const res = await axios.request(config)

      if (Client.activeDebug) {
        console.log('New token generated for the client!')
      }

      return res.data.access_token as string
    } catch (err: any) {
      console.error(
        err.response.status,
        err.response.statusText,
        err.response.data
      )
    }

    return null
  }

  private async _request (
    method: string | 'POST',
    path: string,
    data?: any | null,
    config?: any | null,
    token?: string | null
  ): Promise<AxiosResponse<any, any> | null> {
    this._token = token ?? this._token ?? await this._getToken()

    for (let stop = 2; stop !== 0; stop--) {
      const _config = {
        ...config,
        url: Client.uri + path,
        method,
        headers: {
          ...config?.headers,
          Authorization: 'Bearer ' + this._token,
          'Accept-Encoding': 'application/json'
        },
        data
      }

      try {
        return await limiter.schedule(async () => await axios.request(_config as AxiosRequestConfig))
      } catch (error: any) {
        console.error(
          error.response.status,
          error.response.statusText,
          error.response.data
        )

        if (error.response.status === 401) {
          // refresh token once
          console.log(error, 'Retrying..')
          this._token = await this._getToken()
        } else {
          return null
        }
      }
    }

    return null
  }

  async get (path: string, data?: any | null, config?: any | null, token?: string | null): Promise<AxiosResponse<any, any> | null> {
    return await this._request('GET', path, data, config, token)
  }

  async post (path: string, data?: any | null, config?: any | null, token?: string | null): Promise<AxiosResponse<any, any> | null> {
    return await this._request('POST', path, data, config, token)
  }

  async put (path: string, data?: any | null, config?: any | null, token?: string | null): Promise<AxiosResponse<any, any> | null> {
    return await this._request('PUT', path, data, config, token)
  }

  async delete (path: string, data?: any | null, config?: any | null, token?: string | null): Promise<AxiosResponse<any, any> | null> {
    return await this._request('DELETE', path, data, config, token)
  }

  async fetch (
    path: string,
    limit: number = 0,
    token?: string
  ): Promise<object[]> {
    const pages: object[] | null = []
    let page: object[] = []
    let res: AxiosResponse<any, any> | null
    const bar: Loader = new Loader(24)
    const size: number = limit < 100 && limit > 0 ? limit : 100
    bar.start()
    try {
      for (let i = 1; page?.length != null || i === 1; i++) {
        pages.push(...page)
        res = await this.get(
          path + `&page[size]=${size}&page[number]=` + i,
          token
        )
        if (res === null) throw new Error('Error in Client.fetch')
        page = res.data
        const total = limit ?? Number(res.headers['x-total'])
        bar.step('Fetching pages', pages.length, total)
        if (limit != null && pages.length >= limit) {
          bar.end()
          return pages.slice(0, limit)
        }
      }
    } catch (err) {
      console.error(err)
    }
    bar.end()
    return pages
  }

  get auth_manager (): AuthManager {
    return this._auth_manager
  }
}
