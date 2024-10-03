export interface WhyChooseType {
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