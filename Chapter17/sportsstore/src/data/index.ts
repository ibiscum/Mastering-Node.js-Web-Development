import { CatalogRepository } from "./catalog_repository.js";
import { CatalogRepoImpl } from "./orm/index.js";

export const catalog_repository: CatalogRepository = new CatalogRepoImpl();
