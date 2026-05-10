import { endPromise, writePromise } from "./promises.js";
//import { Count } from "./counter_cb";
import { Count } from "./count_promise.js";
const total = 2_000_000_000;
const iterations = 15;
let shared_counter = 0;
export const handler = async (req, res) => {
    const request = shared_counter++;
    try {
        await Count(request, iterations, total);
        const msg = `Request: ${request}, Iterations: ${iterations}`;
        await writePromise.bind(res)(msg + "\n");
        await endPromise.bind(res)("Done");
    }
    catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end();
    }
};
