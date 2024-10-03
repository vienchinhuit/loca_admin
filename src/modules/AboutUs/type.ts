export interface AboutUs {
  name: string;
  file: File;
  des: string;
  top: string
  bottom: string;
}
export interface ConfigAbouUs {
  key: string;
  content: {
    updated_at: Date;
    image: string;
    name: string;
    des: string;
    top: string;
    bottom: string;
    thumb: string;
  };
  updated_at: Date;
}
export interface Item {
  name: string;
  des: string;
  status: number;
  file: File
}
export interface Config {
  id: number;
  name: string;
  des: string;
  publish: number;
  sort: number
  image: string;
  thumb: string
  created_at: Date;
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
  thumb: string
  created_at: string;
}
