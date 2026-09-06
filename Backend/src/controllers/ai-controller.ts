import express, { NextFunction, Request, Response, Router } from "express";
import { aiService } from "../services/ai-service";
import { securityMiddleware } from "../middleware/security-middleware";

class AiController {
    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/ai/recommendation/:destination", securityMiddleware.verifyLoggedIn, this.getRecommendation);
    }

    private getRecommendation = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const destination = request.params.destination.toString();
            const recommendation = await aiService.getRecommendation(destination);
            response.json(recommendation);
        }
        catch (err: any) {
            next(err);
        }
    };
}

export const aiController = new AiController();