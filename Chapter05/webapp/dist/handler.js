import escape from "escape-html";
export const redirectionHandler = (req, resp) => {
    resp.writeHead(302, {
        Location: "https://localhost:5500",
    });
    resp.end();
};
export const notFoundHandler = (req, resp) => {
    resp.sendStatus(404);
};
export const newUrlHandler = (req, resp) => {
    const msg = req.params.message ?? "(No Message)";
    resp.send(`Hello, ${escape(String(msg))}`);
};
export const defaultHandler = (req, resp) => {
    if (req.query.keyword) {
        resp.send(`Hello, ${escape(String(req.query.keyword))}`);
    }
    else {
        resp.send(`Hello, ${req.protocol.toUpperCase()}`);
    }
};
