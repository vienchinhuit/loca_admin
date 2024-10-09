export interface Banner {
  key: string;
  content: {
    name: string;
    des: string;
    image: string;
    link_1: string;
    link_2?: string;
    text_link_1?: string;
    text_link_2?: string;
    thumb: string;
  };
  updated_at: Date;
}
export interface Config {
  file: File;
  name: string;
  des: string;
  link: string;
}
