import { UserModel } from "../models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";
import { Role } from "../models/enums";
import crypto from "crypto";

class Cyber {
    // Hash a password with HMAC-SHA512 + a salt from .env.
    public hashPassword = (plainText: string): string => {
        const hashText = crypto.createHmac("sha512", appConfig.hashSalt).update(plainText).digest("hex");

        // return hashed password:
        return hashText;
    }

    // Generate new token:
    public generateToken = (user: UserModel): string => {

        user.password = undefined!;

        // Create payload:
        const payload = { user };

        // Create options:
        const options: SignOptions = { expiresIn: "2h" };

        // Generate token:
        const token = jwt.sign(payload, appConfig.jwtSecret!, options);

        return token;

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

    public verifyAdmin = (token: string): boolean =>{
        if(!this.verifyToken(token)) return false;
        const payload = jwt.decode(token) as {user:UserModel};
        return payload?.user?.roleId === Role.Admin;
    }

    
    public getUserFromToken = (token:string): UserModel =>{
        const payload = jwt.decode(token) as {user:UserModel};
        return payload.user;
    }
}

export const cyber = new Cyber();
