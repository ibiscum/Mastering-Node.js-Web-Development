import validator from "validator";
export const validate = (propName) => {
    const tests = {};
    const handler = (req, resp, next) => {
        const vreq = req;
        if (!vreq.validation) {
            vreq.validation = { results: {}, valid: true };
        }
        vreq.validation.results[propName] = { valid: true };
        Object.keys(tests).forEach((k) => {
            let valid = (vreq.validation.results[propName][k] = tests[k](req.body?.[propName]));
            if (!valid) {
                vreq.validation.results[propName].valid = false;
                vreq.validation.valid = false;
            }
        });
        next();
    };
    handler.required = () => {
        tests.required = (val) => !validator.isEmpty(val, { ignore_whitespace: true });
        return handler;
    };
    handler.minLength = (min) => {
        tests.minLength = (val) => validator.isLength(val, { min });
        return handler;
    };
    handler.isInteger = () => {
        tests.isInteger = (val) => validator.isInt(val);
        return handler;
    };
    return handler;
};
export const getValidationResults = (req) => {
    return req.validation || { valid: true };
};
