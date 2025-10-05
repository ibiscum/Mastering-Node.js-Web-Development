import { Request, Response } from "express";
import escapeHtml from "escape-html";

// Recursively escapes all string values in given obj/array
function deepEscape(obj: any): any {
    if (typeof obj === "string") {
        return escapeHtml(obj);
    } else if (Array.isArray(obj)) {
        return obj.map(deepEscape);
    } else if (obj && typeof obj === "object") {
        const newObj: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = deepEscape(obj[key]);
            }
        }
        return newObj;
    }
    return obj;
}

export const testHandler = async (req: Request, resp: Response) => {    
    resp.setHeader("Content-Type", "application/json")
    const sanitizedBody = deepEscape(req.body);
    resp.json(sanitizedBody);
    resp.end();        
}
