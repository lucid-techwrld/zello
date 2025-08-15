"use strict";
// @ts-nocheck
/**
 * @param {import ('knex').Knex} knex
 */
exports.up = function (knex) {
    return knex.schema.alterTable("users", (table) => {
        table.boolean("isVerified").notNullable().defaultTo(false);
    });
};
exports.down = function (knex) {
    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("isVerified");
    });
};
