export interface ResponseObject<T> {
    data: T;
    error: string | null;
    status: number;
}