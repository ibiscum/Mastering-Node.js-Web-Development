import { Request, Response } from "express";
import escape from "escape-html";

// Recursively escape all string values in an object/array
function escapeObject(obj: any): any {
  if (typeof obj === "string") {
    return escape(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(escapeObject);
  } else if (obj !== null && typeof obj === "object") {
    const escapedObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        escapedObj[key] = escapeObject(obj[key]);
      }
    }
    return escapedObj;
  }
  return obj;
}

export const testHandler = async (req: Request, resp: Response) => {
  resp.setHeader("Content-Type", "application/json");
  // Escape all user-controlled input before returning it
  resp.json(escapeObject(req.body));
  resp.end();
};
