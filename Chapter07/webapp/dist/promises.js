export const readHandler = (req, resp) => {
    // resp.json({
    //     message: "Hello, World"
    // });
    resp.cookie("sessionID", "mysecretcode", { secure: true, httpOnly: true });
    req.pipe(resp);
};
