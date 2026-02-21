import { Request, Response } from "express";
import escape from "escape-html";
// Recursively escape all string properties in a JSON object
function sanitizeObject(obj: string | number | boolean | null | Record<string, unknown> | unknown[]): string | number | boolean | null | Record<string, unknown> | unknown[] {
  if (typeof obj === "string") {
    return escape(obj);
  } else if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item as string | number | boolean | null | Record<string, unknown> | unknown[]));
  } else if (obj && typeof obj === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
      sanitized[key] = sanitizeObject((obj as Record<string, unknown>)[key] as string | number | boolean | null | Record<string, unknown> | unknown[]);
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
