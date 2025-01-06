export type Email = `${string}@${string}.${string}`

export interface Authentication {
  email?: Email
  password?: string
  token?: string
}

export interface AdapterOptions {
  storage_quota?: number
}

export interface QueryOporator {
  $eq?: string | number | boolean | Date | null
  $gt?: string | number | Date
  $gte?: string | number | Date
  $lt?: string | number | Date
  $lte?: string | number | Date
  $ne?: string | number | Date
  $in?: string[] | number[] | Date[]
  $nin?: string[] | number[] | Date[]
  $regex?: string
  $like?: string
  $AND?: Query
  $OR?: Query
}

export interface Query {
  [key: string]: Query | QueryOporator
}

export interface GetDataOptions {
  [key: string]: any
}

export interface GetDataProps {
  data: any
  options?: GetDataOptions
}

export interface Adapter {
  STORAGE_QUATA: number
  storage_quota: number
  current_storage: number
  getUsedStorage(): number | Promise<number>
  increateUsedStorage(size: number): void | Promise<void>
  getData({ data, options }: GetDataProps): Promise<any>
  get<T extends Query>(query: T): Promise<{ data: keyof T }>
  post<T>(endpoint: string, data: any): T | Promise<T>
  put<T>(endpoint: string, data: any): T | Promise<T>
  delete<T>(endpoint: string, data: any): T | Promise<T>
  constructor<T extends AdapterOptions>(options: T): void
}
