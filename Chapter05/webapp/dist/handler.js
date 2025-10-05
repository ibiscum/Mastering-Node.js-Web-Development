"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHandler = exports.newUrlHandler = exports.notFoundHandler = exports.redirectionHandler = void 0;
const escape_html_1 = __importDefault(require("escape-html"));
const redirectionHandler = (req, resp) => {
    resp.writeHead(302, {
        "Location": "https://localhost:5500"
    });
    resp.end();
};
exports.redirectionHandler = redirectionHandler;
const notFoundHandler = (req, resp) => {
    resp.sendStatus(404);
};
exports.notFoundHandler = notFoundHandler;
const newUrlHandler = (req, resp) => {
    const msg = req.params.message ?? "(No Message)";
    resp.send(`Hello, ${(0, escape_html_1.default)(msg)}`);
};
exports.newUrlHandler = newUrlHandler;
const defaultHandler = (req, resp) => {
    if (req.query.keyword) {
        resp.send(`Hello, ${(0, escape_html_1.default)(String(req.query.keyword))}`);
    }
    else {
        resp.send(`Hello, ${req.protocol.toUpperCase()}`);
    }
};
exports.defaultHandler = defaultHandler;
