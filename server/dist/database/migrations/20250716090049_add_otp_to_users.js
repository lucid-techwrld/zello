"use strict";
//@ts-nocheck
/**
 * @param {import ('knex').Knex} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable("otps", (table) => {
        table.increments("id").primary();
        table.string("otp_code").notNullable();
        table.string("email").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("expired_at").notNullable();
        table.boolean("isUsed").defaultTo(false);
        table.index(["email", "otp_code"]);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable("otps");
};
