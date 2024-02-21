import { type Campus } from './Campus'
import { type Cursus } from './Cursus'

export interface IProject {
  id: number
  name: string
  slug: string
  parent_id: number
  parent: Project | null
  children: Project[]
  description: string
  objectives: string[]
  tier: number
  attachments: object[]
  created_at: Date
  updated_at: Date
  exam: boolean
  cusus: Cursus
  campus: Campus
  skills: object[]
  project_sessions: object[]
}

export class Project {
  id: number
  name: string
  slug: string
  parent_id: number
  parent: Project | null
  children: Project[]
  description: string
  objectives: string[]
  tier: number
  attachments: object[]
  created_at: Date
  updated_at: Date
  exam: boolean
  cusus: Cursus
  campus: Campus
  skills: object[]
  project_sessions: object[]

  constructor (data: IProject) {
    this.id = data.id
    this.name = data.name
    this.slug = data.slug
    this.parent_id = data.parent_id
    this.parent = data.parent
    this.children = data.children
    this.description = data.description
    this.objectives = data.objectives
    this.tier = data.tier
    this.attachments = data.attachments
    this.created_at = data.created_at
    this.updated_at = data.updated_at
    this.exam = data.exam
    this.cusus = data.cusus
    this.campus = data.campus
    this.skills = data.skills
    this.project_sessions = data.project_sessions
  }
}
