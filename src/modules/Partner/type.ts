export interface KeyTitle {
  name: string;
  des: string;
}
export interface KeyTitleConfig {
  key: string;
  content: {
    name: string;
    des: string
  };
  updated_at: Date;
}

export interface Driver {
    file: File
    name: string
    des: string
    sort: string
  }
  export interface Config {
    id: number;
    image: string;
    thumb: string
    name: string
    des: string
    sort: string
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
    sort: string
  }