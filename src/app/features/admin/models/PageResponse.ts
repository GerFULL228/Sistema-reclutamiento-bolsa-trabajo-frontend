export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;   // pagina actual (0-index)
  size: number;
}
