//@ts-nocheck

/**
 * @param {import ('knex').Knex} knex
 */

exports.up = async function (knex) {
  // ✅ 1. Add the search_vector column first
  await knex.schema.alterTable("properties", (table) => {
    table.specificType("search_vector", "tsvector");
  });

  // 2. Populate search_vector for existing rows
  await knex.raw(`
    UPDATE properties
    SET search_vector = to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(city, '') || ' ' ||
      coalesce(state, '') || ' ' ||
      coalesce(type, '')
    );
  `);

  // 3. Create GIN index for fast full-text search
  await knex.raw(`
    CREATE INDEX properties_search_vector_idx
    ON properties
    USING GIN (search_vector);
  `);

  // 4. Create trigger function
  await knex.raw(`
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
  await knex.raw(`
    CREATE TRIGGER trigger_update_search_vector
    BEFORE INSERT OR UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_search_vector();
  `);
};

exports.down = async function (knex) {
  await knex.raw(
    `DROP TRIGGER IF EXISTS trigger_update_search_vector ON properties`
  );
  await knex.raw(`DROP FUNCTION IF EXISTS update_search_vector`);
  await knex.raw(`DROP INDEX IF EXISTS properties_search_vector_idx`);

  return await knex.schema.alterTable("properties", (table) => {
    table.dropColumn("search_vector");
  });
};
