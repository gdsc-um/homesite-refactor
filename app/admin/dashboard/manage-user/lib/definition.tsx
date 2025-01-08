export enum UserRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    SUPERADMIN = "SUPERADMIN"
}


export interface Userssss {
    id: string;
    nim: string;
    name: string;
    email: string;
    role: UserRole;
    avatar: string;
    profil_bevy: string;
    createdAt: Date;
    updatedAt: Date;
}
