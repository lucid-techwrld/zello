"use strict";
//@ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @param {import ('knex').Knex} knex
 */
exports.up = function (knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
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
    });
};
exports.down = function (knex) {
    return knex.dropTable("bookmarks");
};
