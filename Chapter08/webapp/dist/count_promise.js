"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Count = void 0;
var worker_threads_1 = require("worker_threads");
var Count = function (request, iterations, total) {
    return new Promise(function (resolve, reject) {
        var worker = new worker_threads_1.Worker(__dirname + "/count_worker.js", {
            workerData: {
                iterations: iterations,
                total: total,
                request: request
            }
        });
        worker.on("message", function (iter) {
            var msg = "Request: ".concat(request, ", Iteration: ").concat((iter));
            console.log(msg);
        });
        worker.on("exit", function (code) {
            if (code !== 0) {
                reject();
            }
            else {
                resolve();
            }
        });
        worker.on("error", reject);
    });
};
exports.Count = Count;
//# sourceMappingURL=count_promise.js.map