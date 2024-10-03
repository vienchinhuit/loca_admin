export interface System {
  id: number;
  name: string;
  des: string;
  status: number;
}
export interface Config {
  id: number;
  name: string;
  des: string;
  status: number;
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
  des: string
  status: boolean
}