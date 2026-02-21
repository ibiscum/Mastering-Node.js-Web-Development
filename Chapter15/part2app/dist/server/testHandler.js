"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testHandler = void 0;
const escape_html_1 = __importDefault(require("escape-html"));
function sanitizeObject(obj) {
    if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
    }
    else if (obj && typeof obj === "object") {
        const sanitized = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sanitized[key] = sanitizeObject(obj[key]);
            }
        }
        return sanitized;
    }
    else if (typeof obj === "string") {
        return (0, escape_html_1.default)(obj);
    }
    return obj;
}
const testHandler = async (req, resp) => {
    resp.setHeader("Content-Type", "application/json");
    resp.json(sanitizeObject(req.body));
    resp.end();
};
exports.testHandler = testHandler;
