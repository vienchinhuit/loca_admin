export interface Driver {
    file: File
    name: string
    des: string
  }
  export interface Config {
    id: number;
    image: string;
    thumb: string
    name: string
    des: string
    publish: number
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
    name: string
    des: string
    publish: boolean
    thumb: string
    created_at: string;
  }