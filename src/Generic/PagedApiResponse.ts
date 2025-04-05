export interface PagedApiResponse<T> {
  isSucess: boolean;
  message: string;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: T;
  errors: any;
}