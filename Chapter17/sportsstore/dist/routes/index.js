import { createCatalogRoutes } from "./catalog.js";
import { createCartMiddleware, createCartRoutes } from "./cart.js";
export const createRoutes = (app) => {
    createCartMiddleware(app);
    createCatalogRoutes(app);
    createCartRoutes(app);
};
