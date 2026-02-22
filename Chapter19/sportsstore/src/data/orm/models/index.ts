import { Sequelize } from "sequelize";
import { initializeCatalogModels } from "./catalog_helpers.js";
import { initializeCustomerModels } from "./customer_helpers.js";
import { initializeOrderModels } from "./order_helpers.js";

export { ProductModel, CategoryModel, SupplierModel } from "./catalog_models.js";
export { CustomerModel } from "./customer_models.js";
export { OrderModel } from "./order_models.js";

export const initializeModels = (sequelize: Sequelize) => {
  initializeCatalogModels(sequelize);
  initializeCustomerModels(sequelize);
  initializeOrderModels(sequelize);
};
