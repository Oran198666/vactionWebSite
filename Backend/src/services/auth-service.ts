import { OkPacketParams } from "mysql2";
import { UserModel } from "../models/user-model";
import { dal } from "../utils/dal";
import { cyber } from "../utils/cyber";
import { CredentialsModel } from "../models/credentials-model";
import { ClientError } from "../models/client-error";
import { Role, StatusCode } from "../models/enums";


class AuthService {
    public async register(user: UserModel): Promise<string> {

        //email format normalizer
        user.email = user.email.trim().toLowerCase();

        user.validate();

        //registering a user = default value
        user.roleId = Role.User;

        // If email taken:
        if (await this.isEmailTaken(user.email)) {
            throw new ClientError(StatusCode.Conflict, "Email already taken")
        }

        //hash
        user.password = await cyber.hashPassword(user.password);

        //sql
        const sql = "insert into users(firstName, lastName, email, password, roleId) values(?, ?, ?, ?, ?)";
        const values = [user.firstName, user.lastName, user.email, user.password, user.roleId];

        let info: OkPacketParams;
        try {
            info = await dal.execute(sql, values) as OkPacketParams;
        }
        catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new ClientError(StatusCode.Conflict, "Email already taken");
            }
            throw err;
        }

        user.userId = info.insertId!;

        //generate token
        return cyber.generateToken(user);
    }

    public async login(credentials: CredentialsModel): Promise<string> {

        //email format normalizer
        credentials.email = credentials.email.trim().toLowerCase();

        //validate credentials
        credentials.validate();

        //find the user by email
        const sql = "select * from users where email = ?";
        const values = [credentials.email];

        const users = await dal.execute(sql, values) as UserModel[];
        const user = users[0];

        //reject if no user with that email, or the password doesn't match the hash
        if (!user || !(await cyber.comparePassword(credentials.password, user.password))) {
            throw new ClientError(StatusCode.Unauthorized, "Incorrect email or password");
        }
        return cyber.generateToken(user);
    }

    // Check if email already taken:
    private async isEmailTaken(email: string): Promise<boolean> {

        const sql = `select userId from users where email = ?`;
        const values = [email];

        // Execute:
        const users = await dal.execute(sql, values) as UserModel[];
        const user = users[0];

        // Return true if we have such email, false if we don't:
        return !!user;
    }
}

export const authService = new AuthService();