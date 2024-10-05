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
export interface contactUS {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  content: string;
  publish?: number;
}
export interface Config {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  content: string;
  publish: number;
  created_at: Date
}
export interface ListConfig {
  page?: number;
  limit?: number;
  key?: string;
  publish?: number;
}

export interface DataType {
  key: number;
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  content: string;
  publish: boolean;
  created_at: string
}