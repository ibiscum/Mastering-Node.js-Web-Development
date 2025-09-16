import { createServer } from "http";
import express, {Express } from "express";
import { testHandler } from "./testHandler";
import httpProxy from "http-proxy";
import helmet from "helmet";
import { engine } from "express-handlebars";
import * as helpers from "./template_helpers";
import { registerFormMiddleware, registerFormRoutes } from "./forms";

const port = 5000;

const expressApp: Express = express();

// Define the explicit list of allowed template names (without .handlebars extension)
const ALLOWED_TEMPLATES = [
    "home",
    "about",
    "contact"
    // Add more allowed template names as necessary
];

const proxy = httpProxy.createProxyServer({
    target: "http://localhost:5100", ws: true
});

expressApp.set("views", "templates/server");

expressApp.engine("handlebars", engine());
expressApp.set("view engine", "handlebars");

expressApp.use(helmet());
expressApp.use(express.json());

registerFormMiddleware(expressApp);
registerFormRoutes(expressApp);

expressApp.get("/dynamic/:file", (req, resp) => {
    const file = req.params.file;
    // Only allow safe template names: letters, numbers, underscore, dash
    if (!/^[a-zA-Z0-9_-]+$/.test(file)) {
        resp.status(400).send("Invalid template name.");
        return;
    }
    // Further restrict to allowed template files
    if (!ALLOWED_TEMPLATES.includes(file)) {
        resp.status(404).send("Template not found.");
        return;
    }
    resp.render(`${file}.handlebars`, 
        { message: "Hello template", req, helpers: { ...helpers } });
});

expressApp.post("/test", testHandler);
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));
expressApp.use((req, resp) => proxy.web(req, resp));

const server = createServer(expressApp);

server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));

server.listen(port, 
    () => console.log(`HTTP Server listening on port ${port}`));
