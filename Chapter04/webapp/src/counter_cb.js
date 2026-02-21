import { Worker } from "worker_threads";
export const Count = (request, iterations, total, callback) => {
    const worker = new Worker(__dirname + "/count_worker.js", {
        workerData: {
            iterations,
            total,
            request,
        },
    });
    worker.on("message", async (iter) => {
        callback(null, iter);
    });
    worker.on("exit", async (code) => {
        callback(code === 0 ? null : new Error(), true);
    });
    worker.on("error", async (err) => {
        callback(err, true);
    });
};
