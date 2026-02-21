import { ServerResponse } from "http";
import { promisify } from "util";
export const endPromise = promisify(ServerResponse.prototype.end);
export const writePromise = promisify(ServerResponse.prototype.write);
