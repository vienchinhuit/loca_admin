export interface KeyTitle {
  name: string;
  des: string;
  google_map: string
}
export interface KeyTitleConfig {
  key: string;
  content: {
    name: string;
    des: string
    google_map: string
  };
  updated_at: Date;
}
export interface Branch {
  id: number;
  name: string;
  des: string;
  publish: number;
  sort: number;
}
export interface Config {
  id: number;
  name: string;
  des: string;
  publish: number;
  sort: number;
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
  publish: boolean
  sort: number
}

