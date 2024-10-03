export interface SuccessResponseList<Data> {
  statusCode: string;
  message: string;
  data: Data;
  pagination: {
    page: number;
    limit: number;
    totalPage: number;
  };
}
export interface SuccessResponse<Data> {
  statusCode: number;
  message: string;
  data: Data;
  pagination?: {
    page: number;
    limit: number;
    totalPage: number;
  };
}
export interface ErrorResponse<Data> {
  statusCode: string;
  message: string;
  data?: Data;
}

export interface SuccessResponseValid<Data> {
  statusCode: number;
  message?: string;
  data?: Data;
  errors?: ResponseValidator[];
}

export interface ResponseData {
  statusCode: number;
  message: string;
  errors?: ResponseValidator[]
}

export interface ResponseExcel {
  statusCode: number;
  message: string;
  total: number;
  successTotal: number
  failedTotal: number
  errors: any
}

export interface ErrorExcel {
  STT: string,
  Msg: string
}

export interface ResponseValidator {
  field: string;
  message: string;
}

export interface PageListConfig {
  page?: number;
  limit?: number;
}

