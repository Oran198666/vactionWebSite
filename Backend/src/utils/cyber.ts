import { UserModel } from "../models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";
import { Role } from "../models/enums";
import bcrypt from "bcrypt";

class Cyber {

    public hashPassword = async (plainText: string): Promise<string> => {
        return await bcrypt.hash(plainText, 10);
    }

    public comparePassword = async (plainText: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(plainText, hash);
    }


    public generateToken = (user: UserModel): string => {

        //Pull out password; copy the remaining props into a new object
        //safeUser becomes a new object to prevent mutation
        const { password, ...safeUser } = user;

        //Wrap safeUser in the token payload
        const payload = { user: safeUser };

        const options: SignOptions = { expiresIn: "2h" };

        return jwt.sign(payload, appConfig.jwtSecret!, options);
    }

    public verifyToken = (token: string): boolean => {
        try {
            if (!token) {
                return false;
            }
            jwt.verify(token, appConfig.jwtSecret!);
            return true;
        }
        catch (err: any) {
            return false;
        }
    }

    public verifyAdmin = (token: string): boolean => {
        return this.getUserFromToken(token)?.roleId === Role.Admin;

    }

    public getUserFromToken = (token: string): UserModel | null => {
        try {
            const payload = jwt.verify(token, appConfig.jwtSecret!) as { user:UserModel };
            return payload.user;
        } catch {
            return null;
        }
    }
}

export const cyber = new Cyber();
