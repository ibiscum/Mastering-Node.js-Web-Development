import { Express } from "express";
import { createCatalogRoutes } from "./catalog.js";
import { createCartMiddleware, createCartRoutes } from "./cart.js";

export const createRoutes = (app: Express) => {
  createCartMiddleware(app);

  createCatalogRoutes(app);
  createCartRoutes(app);
};
