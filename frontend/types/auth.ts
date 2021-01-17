export interface IAuthPayload {
    username: string;
    password: string;
}

export interface ITokenResponse {
    access: string;
    refresh: string;
}