const { Pool } = require('pg');

function createDatabasePool() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

async function executeQuery(query, params) {
  const pool = createDatabasePool();
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(query, params);
      return result;
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }
}

module.exports = { createDatabasePool, executeQuery }; 