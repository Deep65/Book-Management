import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

async function startServer() {
  const server = new ApolloServer({ schema });
  await connectDB().then(() => console.log("Mongo Database connected"));
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`GraphQL server ready at ${url}`);
}

startServer();
