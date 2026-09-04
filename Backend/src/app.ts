import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error-middleware";
import { appConfig } from "./utils/app-config";
import { dal } from "./utils/dal";
import { loggerMiddleware } from "./middleware/logger-middleware";

class App {

    public start(): void {

        // Configure smart-saver - images path:


        // Create our server object:
        const server = express();

        // System middleware:

        server.use(cors());
        server.use(express.json());

        // Register "before" middleware:
        server.use(loggerMiddleware.logToConsole);

        // Register controllers:

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