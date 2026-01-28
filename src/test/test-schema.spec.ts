import { describe, it, expect } from "vitest";
import { prepareTestSchema } from "./test-schema";

describe.sequential("prepareTestSchema", async () => {
  const { pgClient } = await prepareTestSchema();
  const table = "example_table";

  beforeAll(async () => {
    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS ${table} (
        id serial PRIMARY KEY,
        name text
      )
    `);
  });

  afterAll(async () => {
    await pgClient.query(`DROP TABLE IF EXISTS ${table}`);
  });

  it("starts with an empty table", async () => {
    const { rows } = await pgClient.query(`SELECT * FROM ${table}`);
    expect(rows.length).toBe(0);
  });

  it("inserts a row", async () => {
    await pgClient.query(`INSERT INTO ${table} (name) VALUES ('Alice')`);
    const { rows } = await pgClient.query(`SELECT * FROM ${table}`);
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe("Alice");
  });

  it("starts again with an empty table", async () => {
    const { rows } = await pgClient.query(`SELECT * FROM ${table}`);
    expect(rows.length).toBe(0);
  });

  it("sets the SUPABASE_DB_SCHEMA environment variable", () => {
    expect(process.env.SUPABASE_DB_SCHEMA).toBe("test_public");
  });
});
