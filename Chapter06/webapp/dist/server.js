import { createServer } from "http";
import express from "express";
import rateLimit from "express-rate-limit";
import { readHandler } from "./readHandler.js";
const port = 5000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
const expressApp = express();
expressApp.use(express.json());
expressApp.post("/read", readHandler);
expressApp.get("/sendcity", limiter, (req, resp) => {
    resp.sendFile("city.png", { root: "static" });
});
expressApp.get("/downloadcity", limiter, (req, resp) => {
    resp.download("static/city.png");
});
expressApp.get("/json", (req, resp) => {
    resp.json("{name: Bob}");
});
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));
const server = createServer(expressApp);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
