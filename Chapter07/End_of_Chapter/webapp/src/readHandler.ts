import { Request, Response } from "express";

export const readHandler = (req: Request, resp: Response) => {    
    // resp.json({
    //     message: "Hello, World"
    // });
    resp.cookie("sessionID", "mysecretcode", { secure: true, httpOnly: true });
    req.pipe(resp);
}
