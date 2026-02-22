import { Validator } from "./validator.js";
import { required, minLength, email, no_op } from "./basic_rules.js";
import { Address } from "../order_models.js";
import { Customer } from "../customer_models.js";

export const CustomerValidator = new Validator<Customer>({
  name: [required, minLength(6)],
  email: email,
  federatedId: no_op,
});

export const AddressValidator = new Validator<Address>({
  street: required,
  city: required,
  state: required,
  zip: no_op,
});
