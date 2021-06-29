import express from "express";
import { connect } from "./db";
import { createMiddleware } from "./middleware";
import router from "./routes";

const server = express();

export async function start() {
  const db = await connect();

  server.use(...createMiddleware(db));
  server.use(router);

  server.listen(process.env.PORT, () => {
    console.log(`running in ${process.env.NODE_ENV} on ${process.env.PORT}`);
  });
}
