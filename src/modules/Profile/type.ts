export interface Profile {
    id?: number;
    username: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    publish?: number;
    created_at: Date
  }