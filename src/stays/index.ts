import express, { Request, Response } from "express";
import { findInCollection, QueryableFields } from "../queries";

const router = express.Router();

const LISTINGS_COLLECTION = "listingsAndReviews";

const queryableFields: QueryableFields = {
  bedrooms: "scalar",
  beds: "scalar",
  bathrooms: "scalar",
  amenities: "vector",
};

/**
 * Takes a request body of the shape
 * { offset: number, ...query }
 * And returns
 * { offset: number, results: [...] }
 *
 * The offset returned can be passed in to a subsequent search to get the next page of results
 */
async function searchStays(req: Request, res: Response) {
  const collection = req.db.collection(LISTINGS_COLLECTION);
  const { offset, ...query } = req.body;
  const results = await findInCollection(
    collection,
    queryableFields,
    query,
    offset
  );
  const newOffset = (offset || 0) + results.length;
  res.json({
    results,
    offset: newOffset,
  });
}

router.post("/", searchStays);

export default router;
