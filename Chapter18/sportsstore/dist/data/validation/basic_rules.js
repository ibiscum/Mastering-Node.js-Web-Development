import validator from "validator";
export const minLength = (min) => (status) => {
    if (!validator.isLength(status.value, { min })) {
        status.setInvalid(true);
        status.messages.push(`Enter at least ${min} characters`);
    }
};
export const email = (status) => {
    if (!validator.isEmail(status.value)) {
        status.setInvalid(true);
        status.messages.push("Enter an email address");
    }
};
export const required = (status) => {
    if (validator.isEmpty(status.value.toString(), { ignore_whitespace: true })) {
        status.setInvalid(true);
        status.messages.push("A value is required");
    }
};
export const no_op = (status) => {
    /* do nothing */
};
