const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

// Update with your config settings.
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
    migrations: { tableName: "knex_migrations" },
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
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
  },
};

module.exports = config;
