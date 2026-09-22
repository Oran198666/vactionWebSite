import express from "express";
import { aiController } from "./controllers/ai-controller";
import { likesController } from "./controllers/likes-controller";
import cors from "cors";
import { securityMiddleware } from "./middleware/security-middleware";
import { errorMiddleware } from "./middleware/error-middleware";
import { appConfig } from "./utils/app-config";
import fileUpload from "express-fileupload";
import { authController } from "./controllers/auth-controller";
import { mcpClient } from "./mcp/mcp-client";
import { loggerMiddleware } from "./middleware/logger-middleware";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { vacationsController } from "./controllers/vacations-controller";
import { reportsController } from "./controllers/reports-controller";
import { mcpController } from "./controllers/mcp-controller";

class App {

    public async start(): Promise<void> {

        //Images folder: relative to where the app was started,
        //so it works for both src (dev) and dist (build)
        fileSaver.config(path.join(process.cwd(), "src", "1-assets", "images"));
        await mcpClient.init();

        // Create our server object & System middleware
        const server = express();
        server.use(cors());
        securityMiddleware.headerProtection(server); // Prevent header attacks.
        securityMiddleware.registerRateLimit(server); // Prevent DoS attacks.
        server.use(express.json());
        server.use(fileUpload());

        // Register "before" middleware:
        server.use(securityMiddleware.preventXss)
        server.use(loggerMiddleware.logToConsole);

        // Register controllers:
        server.use("/", authController.router);
        server.use("/", vacationsController.router);
        server.use("/", likesController.router);
        server.use("/", reportsController.router)
        server.use("/", aiController.router);
        server.use("/", mcpController.router)

        // Register "after" middleware:
        server.use(errorMiddleware.routeNotFound);
        server.use(errorMiddleware.catchAll);

        // Run server:
        server.listen(appConfig.port, () => console.log("Listening..."));
    }
}

const app = new App();
//log errors on startup
app.start().catch(err => console.log(err));


///// taskkill /F /IM node.exe