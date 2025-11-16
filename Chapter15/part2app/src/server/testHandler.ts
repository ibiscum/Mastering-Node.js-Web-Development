import { Request, Response } from "express";
import escapeHtml from "escape-html";

function sanitizeObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  } else if (obj && typeof obj === "object") {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  } else if (typeof obj === "string") {
    return escapeHtml(obj);
  }
  return obj;
}

export const testHandler = async (req: Request, resp: Response) => {
  resp.setHeader("Content-Type", "application/json");
  resp.json(sanitizeObject(req.body));
  resp.end();
};
