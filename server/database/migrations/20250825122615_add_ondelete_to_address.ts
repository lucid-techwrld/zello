// @ts-nocheck

/**
 * @param {import ('knex').Knex} knex
 */

exports.up = function (knex) {
  return knex.schema.alterTable("user_address", (table) => {
    table.dropForeign("user_id");

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = async function (knex) {
  return await knex.schema.alterTable("user_address", (table) => {
    table.dropForeign("user_id");

    table.foreign("user_id").references("id").inTable("users");
  });
};
