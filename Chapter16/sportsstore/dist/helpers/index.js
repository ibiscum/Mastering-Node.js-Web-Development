import { getConfig } from "../config/index.js";
import { engine } from "express-handlebars";
import * as env_helpers from "./env.js";
const location = getConfig("templates:location");
const config = getConfig("templates:config");
export const createTemplates = (app) => {
    app.set("views", location);
    app.engine("handlebars", engine({
        ...config,
        helpers: { ...env_helpers },
    }));
    app.set("view engine", "handlebars");
};
