import { Express } from "express";
import { createCatalogRoutes } from "./catalog.js";
import { createCartMiddleware, createCartRoutes } from "./cart.js";
import { createOrderRoutes } from "./orders.js";

export const createRoutes = (app: Express) => {
  createCartMiddleware(app);

  createCatalogRoutes(app);
  createCartRoutes(app);
  createOrderRoutes(app);
};
