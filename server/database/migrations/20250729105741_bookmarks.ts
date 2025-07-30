//@ts-nocheck

/**
 * @param {import ('knex').Knex} knex
 */

exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("bookmarks", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("type").notNullable();
    table.decimal("price", 12, 2).notNullable();
    table.integer("bedrooms");
    table.integer("bathrooms");
    table.string("street").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();

    table.jsonb("images").notNullable().defaultTo("[]");
  });
};

exports.down = function (knex) {
  return knex.dropTable("bookmarks");
};
