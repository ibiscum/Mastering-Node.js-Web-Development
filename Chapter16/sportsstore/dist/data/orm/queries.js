import { CategoryModel, ProductModel, SupplierModel } from "./models/index.js";
export function AddQueries(Base) {
    return class extends Base {
        getProducts() {
            return ProductModel.findAll({
                include: [
                    { model: SupplierModel, as: "supplier" },
                    { model: CategoryModel, as: "category" },
                ],
                raw: true,
                nest: true,
            });
        }
        getCategories() {
            return CategoryModel.findAll({
                raw: true,
                nest: true,
            });
        }
        getSuppliers() {
            return SupplierModel.findAll({
                raw: true,
                nest: true,
            });
        }
    };
}
