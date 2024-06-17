import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "mongodb",
  url: String(process.env.DATABASE_URL),
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.*"],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
};
