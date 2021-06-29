import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";

// this lets TS know that db is available on express's request object
declare module "express" {
  interface Request {
    db: Db;
  }
}

/**
 * This doesn't create a new connection on every request, it merely attaches the
 * singleton connection to every request.
 */
export const createDbMiddleware =
  (db: Db) => (req: Request, res: Response, next: NextFunction) => {
    req.db = db;
    next();
  };
