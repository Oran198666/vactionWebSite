import { NextFunction, Request, Response } from "express";
import colors from "colors";

class LoggerMiddleware {

    // Pass-Through Middleware:
    public logToConsole = (request: Request, response: Response, next: NextFunction): void => {
        const method = request.method;
        const route = request.originalUrl;
        const body = {...request.body};
        if (body.password) body.password = "***";
        //mask password log
        console.log(colors.green(`${method} ${route} | body: ${JSON.stringify(body)}`));
        next(); // Continue to next middleware / controller
    }
}

export const loggerMiddleware = new LoggerMiddleware();
