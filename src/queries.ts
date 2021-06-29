import { Collection } from "mongodb";
import pick from "lodash/pick";
import mapValues from "lodash/mapValues";

type FieldType = "scalar" | "vector";

export type QueryableFields = { [fieldName: string]: FieldType };

type Query = { [fieldName: string]: any };

const MAX_PAGE_SIZE = 25;

// since this just calls lodash it's not worth testing
function getQueryWithOnlyQueryableFields(
  queryableFields: QueryableFields,
  query: Query
) {
  return pick(query, Object.keys(queryableFields));
}

// TODO it wouldn't hurt to unit test this since it's a pure function
function createMongoQuery(queryableFields: QueryableFields, query: Query) {
  return mapValues(query, (value, fieldName) => {
    const fieldIsScalar = queryableFields[fieldName] === "scalar";
    if (fieldIsScalar) {
      return value;
    } else {
      // this allows for someone who is just poking around to provide a single value
      // for a field that is an array and still get back the correct result
      const values = value instanceof Array ? value : [value];
      return { $all: values };
    }
  });
}

// this *could* be unit testsed if you wanted to mock the collection, but
// honestly it might be better to just skip the unit tests and write an integration test
export async function findInCollection(
  collection: Collection,
  queryableFields: QueryableFields,
  _query: Query,
  offset = 0
) {
  const query = getQueryWithOnlyQueryableFields(queryableFields, _query);
  const mongoQuery = createMongoQuery(queryableFields, query);
  return await collection
    .find(mongoQuery, { limit: MAX_PAGE_SIZE, skip: offset })
    .toArray();
}
