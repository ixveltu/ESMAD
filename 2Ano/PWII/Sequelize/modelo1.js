import dotenv from "dotenv";
dotenv.config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

import { Sequelize } from "sequelize";
// Load environment variables from .env file
// GOOD PRACTICE: use environment variables for sensitive information
const sequelize = new Sequelize(
 process.env.DB_NAME,
 process.env.DB_USER,
 process.env.DB_PASSWORD,
 {
  host: process.env.DB_HOST,
  dialect: "mysql",
 }
);

try {
 await sequelize.authenticate();
 console.log("Connection has been established successfully.");
} catch (error) {
 console.error("Unable to connect to the database:", error);
 process.exit(1);
}
