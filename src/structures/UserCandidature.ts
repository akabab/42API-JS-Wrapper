export interface IUserCandidature {
  id: number
  user_id: number
  birth_date: string
  gender: string
  zip_code: string
  country: string
  birth_city: string
  birth_country: string
  postal_street: string
  postal_complement: string | null
  postal_city: string
  postal_zip_code: string | null
  postal_country: string | null
  contact_affiliation: string | null
  contact_last_name: string | null
  contact_first_name: string | null
  contact_phone1: string | null
  contact_phone2: string | null
  max_level_memory: string | null
  max_level_logic: string | null
  other_information: string | null
  language: string | null
  meeting_date: string | null
  piscine_date: string | null
  created_at: string
  updated_at: string
  phone: string | null
  email: string
  pin: string | null
  phone_country_code: string | null
  hidden_phone: string | null
}

export class UserCandidature implements IUserCandidature {
  id: number
  user_id: number
  birth_date: string
  gender: string
  zip_code: string
  country: string
  birth_city: string
  birth_country: string
  postal_street: string
  postal_complement: string | null
  postal_city: string
  postal_zip_code: string | null
  postal_country: string | null
  contact_affiliation: string | null
  contact_last_name: string | null
  contact_first_name: string | null
  contact_phone1: string | null
  contact_phone2: string | null
  max_level_memory: string | null
  max_level_logic: string | null
  other_information: string | null
  language: string | null
  meeting_date: string | null
  piscine_date: string | null
  created_at: string
  updated_at: string
  phone: string | null
  email: string
  pin: string | null
  phone_country_code: string | null
  hidden_phone: string | null

  constructor (data: IUserCandidature) {
    this.id = data.id
    this.user_id = data.user_id
    this.birth_date = data.birth_date
    this.gender = data.gender
    this.zip_code = data.zip_code
    this.country = data.country
    this.birth_city = data.birth_city
    this.birth_country = data.birth_country
    this.postal_street = data.postal_street
    this.postal_complement = data.postal_complement
    this.postal_city = data.postal_city
    this.postal_zip_code = data.postal_zip_code
    this.postal_country = data.postal_country
    this.contact_affiliation = data.contact_affiliation
    this.contact_last_name = data.contact_last_name
    this.contact_first_name = data.contact_first_name
    this.contact_phone1 = data.contact_phone1
    this.contact_phone2 = data.contact_phone2
    this.max_level_memory = data.max_level_memory
    this.max_level_logic = data.max_level_logic
    this.other_information = data.other_information
    this.language = data.language
    this.meeting_date = data.meeting_date
    this.piscine_date = data.piscine_date
    this.created_at = data.created_at
    this.updated_at = data.updated_at
    this.phone = data.phone
    this.email = data.email
    this.pin = data.pin
    this.phone_country_code = data.phone_country_code
    this.hidden_phone = data.hidden_phone
  }
}
