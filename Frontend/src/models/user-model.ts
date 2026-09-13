import { Role } from "./role";

export type UserModel = {
	userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    roleId: Role; // User / Admin
}
