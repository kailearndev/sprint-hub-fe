export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
    statusCode?: number;
    meta: meta;
}
type meta = {
    page: number,
    limit: number,
    total: number,
    totalPages: number
}