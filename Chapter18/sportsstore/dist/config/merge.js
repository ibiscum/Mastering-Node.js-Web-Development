export const merge = (target, source) => {
    Object.keys(source).forEach((key) => {
        if (key === "__proto__" || key === "constructor") {
            return;
        }
        if (typeof source[key] === "object" && !Array.isArray(source[key])) {
            if (Object.hasOwn(target, key)) {
                merge(target[key], source[key]);
            }
            else {
                Object.assign(target, source[key]);
            }
        }
        else {
            target[key] = source[key];
        }
    });
};
