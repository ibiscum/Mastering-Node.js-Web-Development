export const testHandler = async (req, resp) => {
    resp.setHeader("Content-Type", "application/json");
    resp.json(req.body);
    resp.end();
};
