import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import jwt from "jsonwebtoken";
import { User } from "./entities/User.js";
import { context } from "./middleware/AuthMiddleware.js";

dotenv.config();

async function startServer() {
  await connectDB();
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context,
  });
  console.log(`GraphQL server ready at ${url}`);
}

startServer();
