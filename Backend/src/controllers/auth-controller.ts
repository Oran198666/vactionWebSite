import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user-model";
import { authService } from "../services/auth-service";
import { StatusCode } from "../models/enums";
import { CredentialsModel } from "../models/credentials-model";

class AuthController {

    public readonly router = express.Router();

    public constructor() {
        this.router.post("/api/register", this.register);
        this.router.post("/api/login", this.login);
    }

    private register = async (request: Request, response: Response, next:NextFunction) => {
        try {
            const user = new UserModel(request.body);
            const token = await authService.register(user);
            response.status(StatusCode.Created).json(token);
        } catch (err: any) { next(err); }
    }

    private login = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.status(StatusCode.OK).json(token);
        } catch (err: any) { next(err); }
    }
}

export const authController = new AuthController();