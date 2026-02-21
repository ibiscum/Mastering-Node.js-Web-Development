import { readFileSync } from "fs";
export const basicHandler = (req, resp) => {
    resp.write(readFileSync("static/index.html"));
    resp.end();
};
