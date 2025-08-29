// @ts-nocheck

/**
 * @param {import ('knex').Knex} knex
 */

exports.up = function (knex) {
  return knex.schema.alterTable("properties", (table) => {
    table.float("latitude");
    table.float("longitude");
  });
};

exports.down = async function (knex) {
  return await knex.schema.alterTable("properties", (table) => {
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });
};
