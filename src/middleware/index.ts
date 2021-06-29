import { Db } from "mongodb";
import { createDbMiddleware } from "./db-middleware";
import loggerMiddleware from "./logger-middleware";

/**
 * Because middleware run sequentially, they should be represented as an array
 */
export const createMiddleware = (db: Db) => [
  createDbMiddleware(db),
  loggerMiddleware,
];
