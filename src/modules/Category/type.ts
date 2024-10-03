export interface Category {
  id?: number;
  heading: string;
  description: string;
  content: string;
  title: string;
  meta_keywords: string;
  meta_description: string;
  publish?: number;
}
export interface Config {
  id: number;
  heading: string;
  publish: number;
  description: string;
  title: string;
  meta_keywords: string;
  meta_description: string;
  content: string;
  category_id: number;
  slug: string;
  created_at: Date;
}
export interface ListConfig {
  page?: number;
  limit?: number;
  keyword?: string;
  publish?: number;
}
export interface DataType {
  key: number;
  id: number;
  heading: string;
  description: string;
  publish: boolean;
  created_at: string;
  slug: string
}
