import { Request, Response } from "express";
import escapeHtml from 'escape-html';
// Recursively escapes all string fields in an object/array
function escapeStrings(obj: any): any {
    if (typeof obj === 'string') {
        return escapeHtml(obj);
    } else if (Array.isArray(obj)) {
        return obj.map(escapeStrings);
    } else if (obj && typeof obj === 'object') {
        const sanitized: any = {};
        for (const key of Object.keys(obj)) {
            sanitized[key] = escapeStrings(obj[key]);
        }
        return sanitized;
    }
    return obj;
}

export const testHandler = async (req: Request, resp: Response) => {    
    resp.setHeader("Content-Type", "application/json")
    const sanitizedBody = escapeStrings(req.body);
    resp.json(sanitizedBody);
    resp.end();        
}
