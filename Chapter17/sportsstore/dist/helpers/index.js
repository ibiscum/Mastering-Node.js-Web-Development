import { getConfig } from "../config/index.js";
import { engine } from "express-handlebars";
import * as env_helpers from "./env.js";
import * as catalog_helpers from "./catalog_helpers.js";
import * as cart_helpers from "./cart_helpers.js";
const location = getConfig("templates:location");
const config = getConfig("templates:config");
export const createTemplates = (app) => {
    app.set("views", location);
    app.engine("handlebars", engine({
        ...config,
        helpers: { ...env_helpers, ...catalog_helpers, ...cart_helpers },
    }));
    app.set("view engine", "handlebars");
};
