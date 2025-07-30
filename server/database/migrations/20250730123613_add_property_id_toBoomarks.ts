//@ts-nocheck

/**
 * @param {import ('knex').Knex} knex
 */

exports.up = async function (knex) {
  return knex.schema.alterTable("bookmarks", (table) => {
    table.uuid("property_id").notNullable();
  });
};

exports.down = function (knex) {
  knex.schema.alterTable("bookmarks", (table) => {
    table.dropColumn("property_id");
  });
};
