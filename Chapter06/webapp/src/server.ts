import { createServer } from "http";
import express, { Express, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { readHandler } from "./readHandler";

const port = 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const expressApp: Express = express();

expressApp.use(express.json());

expressApp.post("/read", readHandler);

expressApp.get("/sendcity", limiter, (req, resp) => {
  resp.sendFile("city.png", { root: "static" });
});

expressApp.get("/downloadcity", limiter, (req: Request, resp: Response) => {
  resp.download("static/city.png");
});

expressApp.get("/json", (req: Request, resp: Response) => {
  resp.json("{name: Bob}");
});

expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));

const server = createServer(expressApp);

server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
