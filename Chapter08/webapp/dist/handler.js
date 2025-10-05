"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
var fs_1 = require("fs");
var basicHandler = function (req, resp) {
    resp.write((0, fs_1.readFileSync)("static/index.html"));
    resp.end();
};
exports.basicHandler = basicHandler;
//# sourceMappingURL=handler.js.map