import { Request, Response } from "express";
// import escape from "escape-html";

/**
 * Recursively escape string properties in an object.
 */
// Removed unnecessary recursive HTML escaping for JSON output

export const testHandler = async (req: Request, resp: Response) => {    
    resp.setHeader("Content-Type", "application/json");
    // Only allow certain fields (example: id and name), and simple types.
    const safeFields = ["id", "name"];
    const sanitizedBody: any = {};
    if (typeof req.body === "object" && req.body !== null) {
        for (const key of safeFields) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                const value = req.body[key];
                // Only accept string/number/boolean (not objects/arrays/functions)
                if (
                    typeof value === "string" ||
                    typeof value === "number" ||
                    typeof value === "boolean" ||
                    value === null
                ) {
                    sanitizedBody[key] = value;
                }
            }
        }
    }
    resp.json(sanitizedBody);
    resp.end();        
}
