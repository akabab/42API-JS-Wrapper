import { type CursusUser } from './CursusUser'
import { type ProjectUser } from './ProjectUser'

export interface IUser {
  id: number
  email: string
  login: string
  first_name: string
  last_name: string
  usual_full_name: string
  usual_first_name?: string
  url: string
  displayname: string
  image: {
    link: string
    version: {
      large: string
      medium: string
      small: string
      micro: string
    }
  }
  'staff?': boolean
  'active?': boolean
  correction_point: number
  pool_month: string
  pool_year: string
  location: string | null
  wallet: number
  anonymize_date: Date
  data_erasure_date: Date
  created_at: Date
  updated_at: Date
  alumnized_at: Date | null
  'alumni?': boolean
  groups: object[]
  cursus_users: CursusUser[]
  projects_users: ProjectUser[]
  languages_users: object[]
  achievements: object[]
  titles: object[]
  titles_users: object[]
  partnerships: object[]
  patroned: object[]
  patroning: object[]
  expertises_users: object[]
  roles: object[]
  campus: object[]
  campus_users: object[]
}

export class User implements IUser {
  id: number
  email: string
  login: string
  first_name: string
  last_name: string
  usual_full_name: string
  usual_first_name?: string
  url: string
  displayname: string
  image: {
    link: string
    version: {
      large: string
      medium: string
      small: string
      micro: string
    }
  }

  'staff?': boolean
  'active?': boolean
  correction_point: number
  pool_month: string
  pool_year: string
  location: string | null
  wallet: number
  anonymize_date: Date
  data_erasure_date: Date
  created_at: Date
  updated_at: Date
  alumnized_at: Date | null
  'alumni?': boolean
  groups: object[]
  cursus_users: CursusUser[]
  projects_users: ProjectUser[]
  languages_users: object[]
  achievements: object[]
  titles: object[]
  titles_users: object[]
  partnerships: object[]
  patroned: object[]
  patroning: object[]
  expertises_users: object[]
  roles: object[]
  campus: object[]
  campus_users: object[]

  constructor (data: IUser) {
    this.id = data.id
    this.email = data.email
    this.login = data.login
    this.first_name = data.first_name
    this.last_name = data.last_name
    this.usual_full_name = data.usual_full_name
    this.url = data.url
    this.displayname = data.displayname
    this.image = data.image
    this['staff?'] = data['staff?']
    this['active?'] = data['active?']
    this.correction_point = data.correction_point
    this.pool_month = data.pool_month
    this.pool_year = data.pool_year
    this.location = data.location
    this.wallet = data.wallet
    this.anonymize_date = data.anonymize_date
    this.data_erasure_date = data.data_erasure_date
    this.created_at = data.created_at
    this.updated_at = data.updated_at
    this.alumnized_at = data.alumnized_at
    this['alumni?'] = data['alumni?']
    this.groups = data.groups
    this.cursus_users = data.cursus_users
    this.projects_users = data.projects_users
    this.languages_users = data.languages_users
    this.achievements = data.achievements
    this.titles = data.titles
    this.titles_users = data.titles_users
    this.partnerships = data.partnerships
    this.patroned = data.patroned
    this.patroning = data.patroning
    this.roles = data.roles
    this.expertises_users = data.expertises_users
    this.campus = data.campus
    this.campus_users = data.campus_users
  }
}
