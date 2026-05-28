export interface IUserResponse {
    sub: string
    email: string
    role: string
    iat: number
    exp: number
}
export interface IUserListResponse {
    id: string
    email: string
    name: string
    role: string
    status: string
    createdAt: string
    updatedAt: string
    deletedAt: string
}
