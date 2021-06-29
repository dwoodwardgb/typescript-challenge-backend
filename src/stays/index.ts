import express, { Request, Response } from "express";
import { query, QueryableFields } from "../queries";

const router = express.Router();

const LISTINGS_COLLECTION = "listingsAndReviews";
const queryableFields: QueryableFields = {
  bedrooms: "scalar",
  beds: "scalar",
  bathrooms: "scalar",
  amenities: "vector",
};

router.post("/", async (req: Request, res: Response) => {
  const results = await query(
    req.db.collection(LISTINGS_COLLECTION),
    queryableFields,
    req.body,
    {
      limit: 2,
    }
  );
  res.json(results);
});

export default router;
