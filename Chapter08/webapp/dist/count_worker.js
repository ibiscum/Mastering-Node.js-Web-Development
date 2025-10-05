"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
console.log("Worker thread ".concat(worker_threads_1.workerData.request, " started"));
for (var iter = 0; iter < worker_threads_1.workerData.iterations; iter++) {
    for (var count = 0; count < worker_threads_1.workerData.total; count++) {
        count++;
    }
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(iter);
}
console.log("Worker thread ".concat(worker_threads_1.workerData.request, " finished"));
//# sourceMappingURL=count_worker.js.map