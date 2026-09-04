import { Express, NextFunction, Request, Response } from "express";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import striptags from "striptags";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { cyber } from "../utils/cyber";

class SecurityMiddleware {
 // Verify logged-in:
    public verifyLoggedIn(request: Request, response: Response, next: NextFunction): void {
        const authorization = request.headers.authorization; // Bearer
        const token = authorization?.substring(7); // start at index [7]

        if(cyber.verifyToken(token!)){
            next();// if legal next
        }else{
            const err = new ClientError(StatusCode.Unauthorized, "You are not logged in.");
            next(err); // Go to catchAll middleware.
        }
    }

    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {
        const authorization = request.headers.authorization; // Bearer
        const token = authorization?.substring(7); // start at index [7]

        if(cyber.verifyAdmin!){
             next();// if legal next
        }else{
            const err = new ClientError(StatusCode.Forbidden, "You are not authorized.");
            next(err); // Go to catchAll middleware.
        }
    }

    //executing malicious JS in the victim's browser under the website's origin
    //by removing HTML tags from the string
        public preventXss(request: Request, response: Response, next: NextFunction): void {

        // Run on body object:
        for (const prop in request.body) {

            // Take prop value:
            const value = request.body[prop];

            // If string:
            if (typeof value === "string") {

                // Remove tags:
                request.body[prop] = striptags(value);
            }
        }
        // Continue:
        next();
    }
}

export const securityMiddleware = new SecurityMiddleware();