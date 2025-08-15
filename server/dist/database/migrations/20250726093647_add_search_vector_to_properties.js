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
        // ✅ 1. Add the search_vector column first
        yield knex.schema.alterTable("properties", (table) => {
            table.specificType("search_vector", "tsvector");
        });
        // 2. Populate search_vector for existing rows
        yield knex.raw(`
    UPDATE properties
    SET search_vector = to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(city, '') || ' ' ||
      coalesce(state, '') || ' ' ||
      coalesce(type, '')
    );
  `);
        // 3. Create GIN index for fast full-text search
        yield knex.raw(`
    CREATE INDEX properties_search_vector_idx
    ON properties
    USING GIN (search_vector);
  `);
        // 4. Create trigger function
        yield knex.raw(`
    CREATE OR REPLACE FUNCTION update_search_vector()
    RETURNS trigger AS $$
    BEGIN
      NEW.search_vector :=
        to_tsvector('english',
          coalesce(NEW.title, '') || ' ' ||
          coalesce(NEW.city, '') || ' ' ||
          coalesce(NEW.state, '') || ' ' ||
          coalesce(NEW.type, '')
        );
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);
        // 5. Attach trigger to properties table
        yield knex.raw(`
    CREATE TRIGGER trigger_update_search_vector
    BEFORE INSERT OR UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_search_vector();
  `);
    });
};
exports.down = function (knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.raw(`DROP TRIGGER IF EXISTS trigger_update_search_vector ON properties`);
        yield knex.raw(`DROP FUNCTION IF EXISTS update_search_vector`);
        yield knex.raw(`DROP INDEX IF EXISTS properties_search_vector_idx`);
        return yield knex.schema.alterTable("properties", (table) => {
            table.dropColumn("search_vector");
        });
    });
};
