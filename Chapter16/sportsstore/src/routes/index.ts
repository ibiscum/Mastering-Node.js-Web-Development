import { Express } from "express";
import { createCatalogRoutes } from "./catalog.js";

export const createRoutes = (app: Express) => {
  createCatalogRoutes(app);
};
