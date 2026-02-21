"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const readHandler_1 = require("./readHandler");
const cors_1 = __importDefault(require("cors"));
const http_proxy_1 = __importDefault(require("http-proxy"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const port = 5000;
const expressApp = (0, express_1.default)();
const proxy = http_proxy_1.default.createProxyServer({
    target: "http://localhost:5100",
    ws: true,
});
// expressApp.use((req, resp, next) => {
//     resp.setHeader("Content-Security-Policy", "img-src 'self'; connect-src 'self'");
//     next();
// })
expressApp.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            imgSrc: "'self'",
            scriptSrcAttr: "'none'",
            scriptSrc: "'self'",
            connectSrc: "'self' ws://localhost:5000",
        },
        reportOnly: true,
    },
}));
expressApp.use((0, cors_1.default)({
    origin: "http://localhost:5100",
}));
expressApp.use(express_1.default.json());
const readLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
expressApp.post("/read", readLimiter, readHandler_1.readHandler);
expressApp.use(express_1.default.static("static"));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
expressApp.use((req, resp) => proxy.web(req, resp));
const server = (0, http_1.createServer)(expressApp);
server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
//# sourceMappingURL=server.js.map