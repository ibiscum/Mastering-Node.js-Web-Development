import { Request, Response } from "express";

export const testHandler = async (req: Request, resp: Response) => {
  resp.setHeader("Content-Type", "application/json");
  // Return a static JSON response that does not include user-controlled input
  resp.json({ status: "ok", message: "test handler response" });
};
