import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers/index.js";

export const schema = await buildSchema({
  resolvers,
});
