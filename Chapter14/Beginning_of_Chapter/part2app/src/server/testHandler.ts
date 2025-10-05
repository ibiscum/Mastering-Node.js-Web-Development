import { Request, Response } from "express";
import escape from "escape-html";

/**
 * Recursively escape string properties in an object.
 */
function escapeObject(obj: any): any {
    if (typeof obj === "string") {
        return escape(obj);
    } else if (Array.isArray(obj)) {
        return obj.map(escapeObject);
    } else if (obj !== null && typeof obj === "object") {
        const escaped: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                escaped[key] = escapeObject(obj[key]);
            }
        }
        return escaped;
    } else {
        return obj;
    }
}

export const testHandler = async (req: Request, resp: Response) => {    
    resp.setHeader("Content-Type", "application/json")
    const sanitizedBody = escapeObject(req.body);
    resp.json(sanitizedBody);
    resp.end();        
}
