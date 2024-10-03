export interface Menu {
  id: number;
  name: string;
  link: string;
  publish: number
}
export interface Config {
  id: number;
  name: string;
  link: string;
  publish: number
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
  publish: boolean
}