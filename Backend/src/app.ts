import express from "express";
import cors from "cors";
import { securityMiddleware } from "./middleware/security-middleware";
import { errorMiddleware } from "./middleware/error-middleware";
import { appConfig } from "./utils/app-config";
import fileUpload from "express-fileupload";
import { authController } from "./controllers/auth-controller";
import { loggerMiddleware } from "./middleware/logger-middleware";
import path from "path";
import { fileSaver } from "uploaded-file-saver";

class App {

    public start(): void {

        // Configure smart-saver - images path:
        fileSaver.config(path.join(__dirname, "1-assets", "images"));

        // Create our server object:
        const server = express();

        // System middleware:
        securityMiddleware.headerProtection(server); // Prevent header attacks.
        securityMiddleware.registerRateLimit(server); // Prevent DoS attacks.

        server.use(cors());
        server.use(express.json());
        server.use(fileUpload());

        // Register "before" middleware:
        server.use(securityMiddleware.preventXss)
        server.use(loggerMiddleware.logToConsole);

        // Register controllers:
        server.use("/", authController.router);

        // Register "after" middleware:
        server.use(errorMiddleware.routeNotFound);
        server.use(errorMiddleware.catchAll);

        // Run server:
       server.listen(appConfig.port, () => console.log("Listening..."));

    }
}

const app = new App();
app.start();

// taskkill /F /IM node.exe