import knex, { Knex } from "knex";
const config = require("./knexfile");

const environment = process.env.NODE_ENV || "development";
console.log(`Using database configuration for environment: ${environment}`);
if (!config[environment]) {
  throw new Error(
    `Database configuration for environment "${environment}" not found.`
  );
}
const dbConfig: Knex.Config = config[environment];

if (!dbConfig) {
  throw new Error(
    `Knex configuration for environment "${environment}" not found.`
  );
}

const db = knex(dbConfig);

export default db;
