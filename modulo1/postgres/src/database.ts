import { Pool } from "pg";

export const pool = new Pool({
  user: "admin",
  password: "password123",
  host: "localhost",
  port: 5432,
  database: "sctec",
});

export async function initDatabase() {
  await pool.query('SELECT 1');
}