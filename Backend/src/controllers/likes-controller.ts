import { securityMiddleware } from "../middleware/security-middleware";
import express, { Request, Response, Router, NextFunction } from "express";
import { StatusCode } from "../models/enums";
import { VacationModel } from "../models/vacation-model";
import { vacationsService } from "../services/vacations-service";
import { cyber } from "../utils/cyber";

import { fileSaver } from "uploaded-file-saver";
import { likesService } from "../services/likes-service";


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
            const vacationId = +(request.params.vacationId as string);
            await likesService.removeLike(user.userId!, vacationId);
            response.sendStatus(StatusCode.NoContent);
        }catch (err: any) {
            next(err);
        }
    }

}
export const likesController = new LikesController();