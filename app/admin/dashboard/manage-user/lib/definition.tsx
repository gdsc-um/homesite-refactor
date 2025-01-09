export enum UserRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    SUPERADMIN = "SUPERADMIN"
}

export enum TimRole {
    CORETIM = "CORETIM",
    LEAD = "LEAD",
    AFM = "AFM",
    COM_ADV = "COM_ADV",
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
    role_tim: string;
    password: string;
    updatedAt: Date;
}
