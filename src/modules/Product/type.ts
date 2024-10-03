export interface Product {
  name: string;
  des: string;
  content: string;
  publish: number;
  specification: string;
  file: File;
}
export interface Config {
  id: number;
  code: string;
  name: string;
  des: string;
  content: string
  image: string;
  thumb: string;
  publish: number;
  sort: string;
  created_at: string;
  slug: string;
  specification: string;
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
  des:string;
  specification: string;
  name: string;
  publish: boolean;
  content: string
  image: string;
  thumb: string;
  created_at: string;
  slug: string
}
// export interface Image {
//   id: number;
//   product_id: number;
//   image: string;
//   publish: 1;
//   image_thumbnail: string;
// }
