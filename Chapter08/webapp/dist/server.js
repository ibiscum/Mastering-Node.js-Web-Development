"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express_1 = require("express");
var readHandler_1 = require("./readHandler");
var cors_1 = require("cors");
var http_proxy_1 = require("http-proxy");
var helmet_1 = require("helmet");
var express_rate_limit_1 = require("express-rate-limit");
var port = 5000;
var expressApp = (0, express_1.default)();
var proxy = http_proxy_1.default.createProxyServer({
    target: "http://localhost:5100", ws: true
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
        reportOnly: true
    }
}));
expressApp.use((0, cors_1.default)({
    origin: "http://localhost:5100"
}));
expressApp.use(express_1.default.json());
var readLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
expressApp.post("/read", readLimiter, readHandler_1.readHandler);
expressApp.use(express_1.default.static("static"));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
expressApp.use(function (req, resp) { return proxy.web(req, resp); });
var server = (0, http_1.createServer)(expressApp);
server.on('upgrade', function (req, socket, head) { return proxy.ws(req, socket, head); });
server.listen(port, function () { return console.log("HTTP Server listening on port ".concat(port)); });
//# sourceMappingURL=server.js.map