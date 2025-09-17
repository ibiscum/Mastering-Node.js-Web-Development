export const merge = (target: any, source: any) : any => {
    Object.keys(source).forEach(key => {
        if (
            key === "__proto__" ||
            key === "constructor" ||
            key === "prototype"
        ) {
            return; // Skip dangerous keys to prevent prototype pollution
        }
        if (typeof source[key] === "object" 
                && !Array.isArray(source[key])) {
            if (Object.hasOwn(target, key)) {
                merge(target[key], source[key]);
            } else {
                Object.assign(target, source[key])
            }
        } else {
            target[key] = source[key];
        }
    });
}
