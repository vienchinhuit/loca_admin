// Liên hệ
export interface InformationContact {
  file: File;
  name: string;
  tax_code: string;
  address: string;
  phone: string;
  email: string;
  google_map_contact: string;
  google_map_footer: string;
  google_map_branch: string;
}
export interface InformationConfig {
  key: string;
  content: {
    image: string;
    thumb: string;
    name: string;
    tax_code: string;
    address: string;
    phone: string;
    email: string;
    google_map_contact: string;
    google_map_footer: string;
    google_map_branch: string;
  };
  status: number;
  updated_at: Date;
}
// Mạng xã hội
export interface SocialContact {
  facebook: string;
  zalo: string;
  youtube: string;
  tiktok: string;
}
export interface SocialConfig {
  key: string;
  content: {
    facebook: string;
    zalo: string;
    youtube: string;
    tiktok: string;
  };
  updated_at: Date;
}
export interface GeneralInfo {
  title: string;
  file: File;
  description: string;
  copyright: string;
}
export interface GeneralConfig {
  key: string;
  content: {
    title: string;
    image: string;
    thumb: string;
    description: string;
    copyright: string;
  };
  updated_at: Date;
}
