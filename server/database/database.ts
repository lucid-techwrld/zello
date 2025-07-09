import knex, { Knex } from "knex";
const config = require("./knexfile");

const environment = process.env.NODE_ENV || "development";
const dbConfig: Knex.Config = config[environment];

if (!dbConfig) {
  throw new Error(
    `Knex configuration for environment "${environment}" not found.`
  );
}

const db = knex(dbConfig);

export default db;
