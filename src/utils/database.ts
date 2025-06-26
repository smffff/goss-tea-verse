import { Pool } from 'pg';

// Database connection pool for direct PostgreSQL access
// Use this for migrations, server-side operations, or admin tasks
export const createDatabasePool = () => {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  return new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false // Required for Supabase
    },
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  });
};

// Helper function to execute queries
export const executeQuery = async (query: string, params?: any[]) => {
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
};

// Helper function to execute transactions
export const executeTransaction = async (queries: { text: string; params?: any[] }[]) => {
  const pool = createDatabasePool();
  
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const results = [];
      for (const query of queries) {
        const result = await client.query(query.text, query.params);
        results.push(result);
      }
      
      await client.query('COMMIT');
      return results;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }
}; 