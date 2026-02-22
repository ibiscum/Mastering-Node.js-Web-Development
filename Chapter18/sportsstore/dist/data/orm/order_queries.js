import { AddressModel, OrderModel } from "./models/order_models.js";
import { CustomerModel } from "./models/customer_models.js";
const queryConfig = {
    include: [
        { model: AddressModel, as: "address" },
        { model: CustomerModel, as: "customer" },
    ],
    raw: true,
    nest: true,
};
export function AddOrderQueries(Base) {
    return class extends Base {
        getOrder(id) {
            return OrderModel.findByPk(id, queryConfig);
        }
        getOrders(excludeShipped) {
            return OrderModel.findAll(excludeShipped
                ? { ...queryConfig, where: { shipped: false } }
                : queryConfig);
        }
    };
}
