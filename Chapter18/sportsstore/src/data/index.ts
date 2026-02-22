import { CatalogRepository } from "./catalog_repository.js";
import { CatalogRepoImpl } from "./orm/index.js";
import { OrderRepository } from "./order_repository.js";

const repo = new CatalogRepoImpl();

export const catalog_repository: CatalogRepository = repo;
export const order_repository: OrderRepository = repo;
