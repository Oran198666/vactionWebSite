import { securityMiddleware } from "../middleware/security-middleware";
import express, { Request, Response, Router, NextFunction } from "express";
import { reportsService } from "../services/reports-service";

class ReportsController {

    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/reports/likes", securityMiddleware.verifyAdmin, this.getLikesReport);
        this.router.get("/api/reports/csv", securityMiddleware.verifyAdmin, this.getCsvReport);
    }

    private getLikesReport = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const report = await reportsService.getLikesReport();
            response.json(report);
        }
        catch (err: any) {
            next(err);
        }
    };

    private getCsvReport = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const csv = await reportsService.getCsvReport();
            response.header("Content-Type", "text/csv");
            response.header("Content-Disposition", "attachment; filename=vacations-report.csv");
            response.send(csv);
        }
        catch (err: any) {
            next(err);
        }
    };
}

export const reportsController = new ReportsController();