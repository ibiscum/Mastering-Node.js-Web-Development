import { CatalogRepoImpl } from "./orm/index.js";
const repo = new CatalogRepoImpl();
export const catalog_repository = repo;
export const order_repository = repo;
export const customer_repository = repo;
