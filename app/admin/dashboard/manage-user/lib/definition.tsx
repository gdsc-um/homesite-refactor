export enum UserRole {
    ADMIN = "Admin",
    USER = "User"
}


export interface User {
    id: string,
    name: string,
    email: string,
    picture: string,
    role: UserRole,
    profile_url: string,

}