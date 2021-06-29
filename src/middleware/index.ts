import { Db } from "mongodb";
import { createDbMiddleware } from "./db-middleware";
import loggerMiddleware from "./logger-middleware";
import bodyParser from "./body-parser";

/**
 * Because middleware run sequentially, they should be represented as an array
 */
export const createMiddleware = (db: Db) => [
  createDbMiddleware(db),
  bodyParser,
  loggerMiddleware,
];
