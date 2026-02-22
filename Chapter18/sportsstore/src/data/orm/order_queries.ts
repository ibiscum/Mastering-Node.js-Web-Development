import { Attributes, FindOptions } from "sequelize";
import { Order } from "../order_models.js";
import { BaseRepo, Constructor } from "./core.js";
import { AddressModel, OrderModel } from "./models/order_models.js";
import { CustomerModel } from "./models/customer_models.js";

const queryConfig: FindOptions<Attributes<OrderModel>> = {
  include: [
    { model: AddressModel, as: "address" },
    { model: CustomerModel, as: "customer" },
  ],
  raw: true,
  nest: true,
};

export function AddOrderQueries<TBase extends Constructor<BaseRepo>>(
  Base: TBase,
) {
  return class extends Base {
    getOrder(id: number): Promise<Order | null> {
      return OrderModel.findByPk(id, queryConfig);
    }

    getOrders(excludeShipped: boolean): Promise<Order[]> {
      return OrderModel.findAll(
        excludeShipped
          ? { ...queryConfig, where: { shipped: false } }
          : queryConfig,
      );
    }
  };
}
