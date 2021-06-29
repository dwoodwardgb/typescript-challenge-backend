import { Collection } from "mongodb";
import pick from "lodash/pick";
import mapValues from "lodash/mapValues";

type FieldType = "scalar" | "vector";

export type QueryableFields = { [fieldName: string]: FieldType };

type Query = { [fieldName: string]: any };

function getQueryWithOnlyQueryableFields(
  queryableFields: QueryableFields,
  query: Query
) {
  return pick(query, Object.keys(queryableFields));
}

function createMongoQuery(queryableFields: QueryableFields, query: Query) {
  return mapValues(query, (value, fieldName) => {
    const fieldIsScalar = queryableFields[fieldName] === "scalar";
    if (fieldIsScalar) {
      return value;
    } else {
      const values = value instanceof Array ? value : [value];
      return { $all: values };
    }
  });
}

export async function query(
  collection: Collection,
  queryableFields: QueryableFields,
  _query: Query,
  ...args: any[]
) {
  const query = getQueryWithOnlyQueryableFields(queryableFields, _query);
  const mongoQuery = createMongoQuery(queryableFields, query);
  return await collection.find(mongoQuery, ...args).toArray();
}
