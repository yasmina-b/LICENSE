import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "yasmina",
  database: "myshop",
  entities: ["src/entities/**/*.ts"],
  synchronize: true,
  logging: false,
});
