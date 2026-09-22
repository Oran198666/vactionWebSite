import z from "zod";
import { ClientError } from "./client-error";
import { Role, StatusCode } from "./enums";

// user Schema:
const UserSchema = z.object({
    userId: z.number().int().positive().optional(),
    firstName: z.string().min(2, "First name must be 2-50 characters").max(50, "First name must be 2-50 characters"),
    lastName: z.string().min(2, "Last name must be 2-50 characters").max(50, "Last name must be 2-50 characters"),
    email: z.email("Please enter a valid email").max(100, "Email is too long"),
    password: z.string().min(4, "Password must be at least 4 characters").max(100, "Password is too long"),
    roleId: z.enum(Role).optional()
});

// User Interface
type IUserModel = z.infer<typeof UserSchema>;

// User Model:
export class UserModel implements IUserModel {
    public userId?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId?: number;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    public validate(): void {
        const result = UserSchema.safeParse(this);
        if(!result.success){
            const message = result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message)
        }
    }
}