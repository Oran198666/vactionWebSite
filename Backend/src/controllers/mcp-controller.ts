import express, { NextFunction, Request, Response } from "express";
import { mcpService } from "../services/mcp-service";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { securityMiddleware } from "../middleware/security-middleware";

class McpController {
    public readonly router = express.Router();

    public constructor() {
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.post("/api/mcp", securityMiddleware.verifyLoggedIn, this.mcp);
    }

    private mcp = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const question = request.body.question;
            if(!question?.trim()) throw new ClientError(StatusCode.BadRequest,"Provide a question")
            const answer = await mcpService.ask(question);
            response.json({ answer });
        } catch (err: any) {
            next(err);
        }
    }
}
export const mcpController = new McpController();