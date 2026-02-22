import { CustomerModel } from "./models/customer_models.js";
import { AddressModel, OrderModel } from "./models/order_models.js";
export function AddCustomers(Base) {
    return class extends Base {
        getCustomer(id) {
            return CustomerModel.findByPk(id, {
                raw: true,
            });
        }
        getCustomerByFederatedId(id) {
            return CustomerModel.findOne({
                where: { federatedId: id },
                raw: true,
            });
        }
        getCustomerAddress(id) {
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
        async storeCustomer(customer) {
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
