import "dotenv/config";
import fs from 'fs';
import { Client } from 'pg';

const client = new Client({ connectionString: process.env.DATABASE_URL });

async function main() {
  try {
    await client.connect();
    const sql = fs.readFileSync('scripts/db-reset-test.sql', 'utf8');
    await client.query(sql);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
