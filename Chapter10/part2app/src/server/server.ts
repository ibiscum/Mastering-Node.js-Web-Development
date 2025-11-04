import { createServer } from "http";
import express, {Express } from "express";
import { testHandler } from "./testHandler";
import httpProxy from "http-proxy";
import helmet from "helmet";
//import { registerCustomTemplateEngine } from "./custom_engine";
import { engine } from "express-handlebars";
import * as helpers from "./template_helpers";
import * as fs from "fs";
import * as path from "path";

const TEMPLATE_DIR = path.resolve(__dirname, "../../templates/server");
const allowedTemplates = fs.readdirSync(TEMPLATE_DIR)
    .filter(name => name.endsWith(".handlebars"))
    .map(name => name.replace(/\.handlebars$/, ""));

const port = 5000;

const expressApp: Express = express();

const proxy = httpProxy.createProxyServer({
    target: "http://localhost:5100", ws: true
});

//registerCustomTemplateEngine(expressApp);
expressApp.set("views", "templates/server");

expressApp.engine("handlebars", engine());
expressApp.set("view engine", "handlebars");

expressApp.use(helmet());
expressApp.use(express.json());

expressApp.get("/dynamic/:file", (req, resp) => {
    const fileName = req.params.file;
    // Allow only safe filenames: letters, numbers, underscores, hyphens
    if (!/^[A-Za-z0-9_-]+$/.test(fileName)) {
        resp.status(400).send("Invalid template name");
        return;
    }
    if (!allowedTemplates.includes(fileName)) {
        resp.status(404).send("Template not found");
        return;
    }
    // Compute absolute resolved path of the template file
    const templatePath = path.resolve(TEMPLATE_DIR, `${fileName}.handlebars`);
    const realTemplateDir = fs.realpathSync(TEMPLATE_DIR);
    let realTemplatePath;
    try {
        realTemplatePath = fs.realpathSync(templatePath);
    } catch (err) {
        resp.status(404).send("Template not found");
        return;
    }
    // Ensure the resolved path is under TEMPLATE_DIR
    if (!realTemplatePath.startsWith(realTemplateDir + path.sep)) {
        resp.status(403).send("Forbidden");
        return;
    }
    resp.render(`${fileName}.handlebars`,
        { message: "Hello template", req,
            helpers: { ...helpers }
        });
});

expressApp.post("/test", testHandler);
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));
expressApp.use((req, resp) => proxy.web(req, resp));

const server = createServer(expressApp);

server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));

server.listen(port, 
    () => console.log(`HTTP Server listening on port ${port}`));
