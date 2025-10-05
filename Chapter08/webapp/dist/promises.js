"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
var readHandler = function (req, resp) {
    // resp.json({
    //     message: "Hello, World"
    // });
    resp.cookie("sessionID", "mysecretcode", { secure: true, httpOnly: true });
    req.pipe(resp);
};
exports.readHandler = readHandler;
//# sourceMappingURL=promises.js.map