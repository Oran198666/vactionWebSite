import { securityMiddleware } from "../middleware/security-middleware";
import express, { Request, Response, Router, NextFunction } from "express";
import { cyber } from "../utils/cyber";
import { likesService } from "../services/likes-service";
import { Role, StatusCode } from "../models/enums";
import { ClientError } from "../models/client-error";


class LikesController {
    public router: Router = express.Router();

    public constructor(){
        this.router.post("/api/vacations/:vacationId/like", securityMiddleware.verifyLoggedIn, this.addLike);
        this.router.delete("/api/vacations/:vacationId/like", securityMiddleware.verifyLoggedIn, this.removeLike);
    }

    private addLike = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const token = request.headers.authorization?.substring(7);
            const user = cyber.getUserFromToken(token!);
            if(user.roleId === Role.Admin) throw new ClientError(StatusCode.Forbidden,"leave the likes for the users");
            const vacationId = +(request.params.vacationId as string);
            await likesService.addLike(user.userId!, vacationId);
            response.sendStatus(StatusCode.NoContent);
        }catch (err: any) {
            next(err);
        }
    }

    private removeLike = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const token = request.headers.authorization?.substring(7);
            const user = cyber.getUserFromToken(token!);
            if(user.roleId === Role.Admin) throw new ClientError(StatusCode.Forbidden,"leave the likes for the users");
            const vacationId = +(request.params.vacationId as string);
            await likesService.removeLike(user.userId!, vacationId);
            response.sendStatus(StatusCode.NoContent);
        }catch (err: any) {
            next(err);
        }
    }

}
export const likesController = new LikesController();