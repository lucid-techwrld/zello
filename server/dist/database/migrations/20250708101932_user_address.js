"use strict";
// @ts-nocheck
/**
 * @param {import ('knex').Knex} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable("user_address", (table) => {
        table.uuid("user_id");
        table.foreign("user_id").references("id").inTable("users");
        table.string("street").notNullable();
        table.string("city").notNullable();
        table.string("state").notNullable();
        table.string("country").defaultTo("Nigeria");
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable("user_address");
};
