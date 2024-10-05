export interface Menu {
  id: number;
  name: string;
  link: string;
  publish: number
  is_main: number
  is_footer: number
  sort: number
}
export interface Config {
  id: number;
  name: string;
  link: string;
  publish: number
  is_main: number
  is_footer: number
  sort: number
}
export interface ListConfig {
  page?: number
  limit?: number
  key?: string
  publish?: number
}
export interface DataType {
  id: number
  name: string;
  link: string;
  sort: number
  publish: boolean
  is_main: boolean
  is_footer: boolean
}