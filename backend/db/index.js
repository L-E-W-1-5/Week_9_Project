import pkg from "pg";
import { neon } from "@neondatabase/serverless";


const { Pool } = pkg

export const neonConnection = neon(process.env.DATABASE_URL);

const databaseUrl = process.env.POSTGRES_CONNECTION_URL;


export const pool = new Pool({
  connectionString: databaseUrl,
});

export default function query(text, params, callback) {
  return pool.query(text, params, callback);
}
