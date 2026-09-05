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

        if (cyber.verifyToken(token!)) {
            next();// if legal next
        } else {
            const err = new ClientError(StatusCode.Unauthorized, "You are not logged in.");
            next(err); // Go to catchAll middleware.
        }
    }

    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {
        const authorization = request.headers.authorization; // Bearer
        const token = authorization?.substring(7); // start at index [7]

        if (cyber.verifyAdmin(token!)) {
            next();// if legal next
        } else {
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

    // Prevent DoS attack:
    public registerRateLimit(server: Express): void {

        // General rate-limit:
        server.use(expressRateLimit({
            windowMs: 1000, // Time window in milliseconds.
            limit: 20, // How many requests allowed in that window.
            skip: (request: Request) => request.path.startsWith("/api/vacations/images/") // Skip when requesting images
        }));

        // Images rate-limit:
        server.use("/api/vacations/images/", expressRateLimit({ // Only images.
            windowMs: 1000, // Time window in milliseconds.
            limit: 200, // How many requests allowed in that window.
        }));
    }

    // Use helmet to protect header attacks:
    public headerProtection(server: Express): void {
        server.use(helmet({
            crossOriginResourcePolicy: { policy: "same-site" } // Enable CORS on images.
        }));
    }
}

export const securityMiddleware = new SecurityMiddleware();