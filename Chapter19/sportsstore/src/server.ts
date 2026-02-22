import { createServer } from "http";
import express, { Express } from "express";
import helmet from "helmet";
import { getConfig } from "./config/index.js";
import { createRoutes } from "./routes/index.js";
import { createTemplates } from "./helpers/index.js";
import { createErrorHandlers } from "./errors.js";
import { createSessions } from "./sessions.js";
import { createAuthentication } from "./authentication.js";

const port = getConfig("http:port", 5000);

const expressApp: Express = express();

expressApp.use(helmet());
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

expressApp.use(express.static("node_modules/bootstrap/dist"));
createTemplates(expressApp);
createSessions(expressApp);

createAuthentication(expressApp);

createRoutes(expressApp);
createErrorHandlers(expressApp);

const server = createServer(expressApp);

server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
