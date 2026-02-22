import { Customer } from "./customer_models.js";
import { Address } from "./order_models.js";

export interface CustomerRepository {
  getCustomer(id: number): Promise<Customer | null>;

  getCustomerByFederatedId(id: string): Promise<Customer | null>;

  getCustomerAddress(id: number): Promise<Address | null>;

  storeCustomer(customer: Customer): Promise<Customer>;
}
