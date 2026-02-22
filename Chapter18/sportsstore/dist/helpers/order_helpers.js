export const toArray = (...args) => args.slice(0, -1);
export const lower = (val) => val.toLowerCase();
export const getValue = (val, prop) => val?.[prop.toLowerCase()] ?? {};
export const get = (val) => val ?? {};
