import express from "express";
import { connect } from "../db";

const router = express.Router();

router.post("/", async (req, res) => {
  const db = await connect();
  const col = db.collection("listingsAndReviews");

  const results = await col.find({}, { limit: 2 });

  res.json(await results.toArray());
});

export default router;
