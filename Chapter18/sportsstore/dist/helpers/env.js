import { Env, getEnvironment } from "../config/index.js";
export const isDevelopment = (value) => {
    return getEnvironment() === Env.Development;
};
