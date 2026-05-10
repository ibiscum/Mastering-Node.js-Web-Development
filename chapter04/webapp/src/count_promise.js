import { Worker } from "worker_threads";
export const Count = (request, iterations, total) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(__dirname + "/count_worker.js", {
            workerData: {
                iterations,
                total,
                request,
            },
        });
        worker.on("message", (iter) => {
            const msg = `Request: ${request}, Iteration: ${iter}`;
            console.log(msg);
        });
        worker.on("exit", (code) => {
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
