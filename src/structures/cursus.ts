export interface ICursus {
  id: number
  created_at: Date
  name: string
  slug: string
  kind: string
}

export class Cursus implements ICursus {
  id: number
  created_at: Date
  name: string
  slug: string
  kind: string

  constructor (data: ICursus) {
    this.id = data.id
    this.created_at = data.created_at
    this.name = data.name
    this.slug = data.slug
    this.kind = data.kind
  }
}
