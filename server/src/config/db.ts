import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.DATABASE_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true, // Ensure this is included
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.*"], // Ensure correct path and file extension
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
};

export default AppDataSource;
