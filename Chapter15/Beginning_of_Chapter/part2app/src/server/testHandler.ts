import { Request, Response } from "express";
import * as escapeHtml from "escape-html";


// Recursively escape all string properties in an object/array
function sanitizeInput(input: any): any {
    if (typeof input === "string") {
        return escapeHtml(input);
    } else if (Array.isArray(input)) {
        return input.map(sanitizeInput);
    } else if (input && typeof input === "object") {
        const sanitizedObj: any = {};
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                sanitizedObj[key] = sanitizeInput(input[key]);
            }
        }
        return sanitizedObj;
    }
    return input; // number, boolean, null, undefined
}

export const testHandler = async (req: Request, resp: Response) => {    
    resp.setHeader("Content-Type", "application/json")
    const safeBody = sanitizeInput(req.body);
    resp.json(safeBody);
    resp.end();        
}
