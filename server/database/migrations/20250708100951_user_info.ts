// @ts-nocheck

/**
 * @param {import('knex').Knex} knex
 */

exports.up = async function (knex) {
  return knex.schema.createTable("user_info", (table) => {
    table.uuid("user_id");
    table.foreign("user_id").references("id").inTable("users");
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.date("dob").notNullable();
    table.string("role").notNullable();
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable("user_info");
};
