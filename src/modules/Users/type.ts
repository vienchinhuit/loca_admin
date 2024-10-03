export interface User {
  id?: number;
  username: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  active?: number;
  created_at: Date
}
export interface Config {
  id: number;
  username: string;
  // password: string;
  name: string;
  phone: string;
  email: string;
  active: number;
  created_at: Date
}
export interface ListConfig {
  page?: number;
  limit?: number;
  key?: string;
  active?: number;
}

export interface DataType {
  key: number;
  id: number;
  username: string
  name: string;
  phone: string;
  email: string;
  active: boolean;
  created_at: string
}