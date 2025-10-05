import { Request, Response } from "express";
import escapeHtml from "escape-html";

function sanitize(input: any): any {
    if (typeof input === "string") {
        return escapeHtml(input);
    } else if (Array.isArray(input)) {
        return input.map(sanitize);
    } else if (input && typeof input === "object") {
        const sanitizedObj: any = {};
        for (const key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key)) {
                sanitizedObj[key] = sanitize(input[key]);
            }
        }
        return sanitizedObj;
    }
    return input;
}

export const testHandler = async (req: Request, resp: Response) => {    
    resp.setHeader("Content-Type", "application/json")
    resp.json(sanitize(req.body));
    resp.end();        
}
