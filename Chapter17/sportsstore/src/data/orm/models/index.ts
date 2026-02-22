import { Sequelize } from "sequelize";
import { initializeCatalogModels } from "./catalog_helpers.js";

export { ProductModel, CategoryModel, SupplierModel } from "./catalog_models.js";

export const initializeModels = (sequelize: Sequelize) => {
  initializeCatalogModels(sequelize);
};
