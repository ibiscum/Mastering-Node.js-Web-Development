import { Customer } from "../customer_models.js";
import { CustomerRepository } from "../customer_repository.js";
import { Address } from "../order_models.js";
import { BaseRepo, Constructor } from "./core.js";
import { CustomerModel } from "./models/customer_models.js";
import { AddressModel, OrderModel } from "./models/order_models.js";

export function AddCustomers<TBase extends Constructor<BaseRepo>>(Base: TBase) {
  return class extends Base implements CustomerRepository {
    getCustomer(id: number): Promise<Customer | null> {
      return CustomerModel.findByPk(id, {
        raw: true,
      });
    }

    getCustomerByFederatedId(id: string): Promise<Customer | null> {
      return CustomerModel.findOne({
        where: { federatedId: id },
        raw: true,
      });
    }

    getCustomerAddress(id: number): Promise<Address | null> {
      return AddressModel.findOne({
        include: [
          {
            model: OrderModel,
            where: { customerId: id },
            attributes: [],
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
    }

    async storeCustomer(customer: Customer): Promise<Customer> {
      const [data, created] = await CustomerModel.findOrCreate({
        where: { email: customer.email },
        defaults: customer,
      });
      if (!created) {
        data.name = customer.name;
        data.email = customer.email;
        data.federatedId = customer.federatedId;
        await data.save();
      }
      return data;
    }
  };
}
