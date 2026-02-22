import { Validator } from "./validator.js";
import { required, minLength, email, no_op } from "./basic_rules.js";
export const CustomerValidator = new Validator({
    name: [required, minLength(6)],
    email: email,
});
export const AddressValidator = new Validator({
    street: required,
    city: required,
    state: required,
    zip: no_op,
});
