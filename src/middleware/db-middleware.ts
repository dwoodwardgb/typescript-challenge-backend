import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";

declare module "express" {
  interface Request {
    db: Db;
  }
}

export const createDbMiddleware =
  (db: Db) => (req: Request, res: Response, next: NextFunction) => {
    req.db = db;
    next();
  };
