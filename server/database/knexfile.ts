const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from root .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const dbUrl = process.env.RENDER
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL_PROD_EXTERNAL;
if (!dbUrl) {
  throw new Error(
    "DATABASE_URL or DATABASE_URL_PROD_EXTERNAL is not defined in the environment variables."
  );
}
const isInternal = dbUrl.includes("internal");

/** @type {import('knex').Knex.Config} */
const config = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
  },
  staging: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
  },
  production: {
    client: "postgresql",
    connection: {
      connectionString: dbUrl,
      ...(isInternal ? {} : { ssl: { rejectUnauthorized: false } }),
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "migrations"),
    },
  },
};

module.exports = config;
