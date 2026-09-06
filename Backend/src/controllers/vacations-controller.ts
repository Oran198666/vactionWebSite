import { securityMiddleware } from "../middleware/security-middleware";
import express, { Request, Response, Router, NextFunction } from "express";
import { StatusCode } from "../models/enums";
import { VacationModel } from "../models/vacation-model";
import { vacationsService } from "../services/vacations-service";
import { cyber } from "../utils/cyber";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";


class VacationsController {
    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/vacations/", securityMiddleware.verifyLoggedIn, this.getAllVacations);
        this.router.get("/api/vacations/images/:imageName", securityMiddleware.verifyLoggedIn, this.getImageFile);
        this.router.get("/api/vacations/:vacationId", securityMiddleware.verifyLoggedIn, this.getOneVacation);
        this.router.post("/api/vacations", securityMiddleware.verifyAdmin, this.addVacation);
        this.router.put("/api/vacations/:vacationId", securityMiddleware.verifyAdmin, this.updateVacation);
        this.router.delete("/api/vacations/:vacationId", securityMiddleware.verifyAdmin, this.deleteVacation);
    }

    private getAllVacations = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const token = request.headers.authorization?.substring(7);
            const user = cyber.getUserFromToken(token!);
            const vacations = await vacationsService.getAllVacations(user.userId!);
            response.json(vacations);
        }
        catch (err: any) {
            next(err);
        }
    }

    private getOneVacation = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const vacationId = +(request.params.vacationId as string);
            const vacation = await vacationsService.getOneVacation(vacationId);
            response.json(vacation);
        }
        catch (err: any) {
            next(err);
        }
    }

    private getImageFile = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const imageName = request.params.imageName as string;
            const imagePath = fileSaver.getFilePath(imageName);
            response.sendFile(imagePath);
        }
        catch (err: any) {
            next(err);
        }
    };

    private addVacation = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const vacation = new VacationModel(request.body);
            vacation.price = +vacation.price;
            vacation.image = request.files?.image as UploadedFile;
            const added = await vacationsService.addVacation(vacation);
            response.status(StatusCode.Created).json(added);
        }
        catch (err: any) {
            next(err);
        }
    }

    private updateVacation = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const vacation = new VacationModel(request.body);
            vacation.vacationId = +(request.params.vacationId as string);
            vacation.price = +vacation.price;
            vacation.image = request.files?.image as UploadedFile;
            const updatedVacation = await vacationsService.updateVacation(vacation);
            response.json(updatedVacation);
        }
        catch (err: any) {
            next(err);
        }
    }

    private deleteVacation = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const vacationId = +(request.params.vacationId as string);
            await vacationsService.deleteVacation(vacationId);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) {
            next(err);
        }
    }

}

export const vacationsController = new VacationsController();