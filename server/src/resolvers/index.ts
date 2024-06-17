import { BookResolver } from "./BookResolver.js";
import { UserResolver } from "./UserResolver.js";

export const resolvers = [UserResolver, BookResolver] as const;
