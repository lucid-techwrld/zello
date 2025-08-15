"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
/**
 * @param {import('knex').Knex} knex
 */
exports.up = function (knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        return knex.schema.createTable("users", (table) => {
            table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table
                .string("avatar")
                .defaultTo("https://img.icons8.com/?size=100&id=18542&format=png&color=000000");
            table.string("email").notNullable().unique();
            table.string("password").notNullable();
            table.timestamps(true, true);
        });
    });
};
/**
 * @param {import('knex').Knex} knex
 */
exports.down = function (knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("users");
    });
};
