export interface Introduce {
    key: string;
    content: {
        name: string;
        des: string;
        image: string;
        link: string;
        thumb: string;
    }
    updated_at: Date;
} 
export interface Config {
    file: File
    name: string
    des: string
    link: string
}