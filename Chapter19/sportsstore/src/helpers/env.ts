import { Env, getEnvironment } from "../config/index.js";

export const isDevelopment = (value: any) => {
  return getEnvironment() === Env.Development;
};
