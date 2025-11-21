import { Request, Response } from "express";
import escape from "escape-html";

// Recursively escape all string values within an object/array
function deepSanitize(value: any): any {
  if (typeof value === "string") {
    return escape(value);
  } else if (Array.isArray(value)) {
    return value.map(deepSanitize);
  } else if (value !== null && typeof value === "object") {
    const result: any = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepSanitize(value[key]);
      }
    }
    return result;
  }
  return value;
}

export const testHandler = async (req: Request, resp: Response) => {
  resp.setHeader("Content-Type", "application/json");
  const safeBody = deepSanitize(req.body);
  resp.json(safeBody);
  resp.end();
};
