import { Request, Response } from "express";
import escape from "escape-html";
// Recursively escape all string properties in a JSON object
function sanitizeObject(obj: any): any {
  if (typeof obj === "string") {
    return escape(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  } else if (obj && typeof obj === "object") {
    const sanitized: any = {};
    for (const key of Object.keys(obj)) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
    return sanitized;
  }
  return obj; // number, boolean, null, etc.
}

export const testHandler = async (req: Request, resp: Response) => {
  resp.setHeader("Content-Type", "application/json");
  const sanitizedBody = sanitizeObject(req.body);
  resp.json(sanitizedBody);
  resp.end();
};
