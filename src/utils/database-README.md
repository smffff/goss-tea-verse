# Database Utilities

This directory contains utilities for direct PostgreSQL database access to your Supabase database.

## Setup

1. **Environment Variables**: Make sure you have the `DATABASE_URL` environment variable set in your `.env.local` file:
   ```
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.luubdvuuxvtkheyhzepm.supabase.co:5432/postgres
   ```

2. **Get Your Password**: 
   - Go to https://supabase.com/dashboard/project/luubdvuuxvtkheyhzepm/settings/database
   - Copy the database password
   - Replace `[YOUR-PASSWORD]` in the DATABASE_URL

## Usage

### Basic Query Execution
```typescript
import { executeQuery } from '@/utils/database';

// Simple query
const result = await executeQuery('SELECT * FROM tea_submissions LIMIT 10');
console.log(result.rows);

// Parameterized query
const submissions = await executeQuery(
  'SELECT * FROM tea_submissions WHERE category = $1',
  ['gossip']
);
```

### Transaction Execution
```typescript
import { executeTransaction } from '@/utils/database';

const queries = [
  { text: 'INSERT INTO tea_submissions (title, content) VALUES ($1, $2)', params: ['Title', 'Content'] },
  { text: 'UPDATE user_stats SET submission_count = submission_count + 1 WHERE user_id = $1', params: ['user123'] }
];

const results = await executeTransaction(queries);
```

### Direct Pool Access
```typescript
import { createDatabasePool } from '@/utils/database';

const pool = createDatabasePool();
const client = await pool.connect();

try {
  const result = await client.query('SELECT NOW()');
  console.log(result.rows[0]);
} finally {
  client.release();
  await pool.end();
}
```

## Security Notes

- **Never commit the actual DATABASE_URL** to version control
- **Use environment variables** for sensitive information
- **This connection has full database access** - use with caution
- **Prefer Supabase client** for most application operations
- **Use direct connections** only for:
  - Database migrations
  - Admin operations
  - Server-side functions
  - Complex queries not supported by Supabase client

## When to Use Direct Database vs Supabase Client

### Use Supabase Client For:
- User authentication
- Row Level Security (RLS) protected operations
- Real-time subscriptions
- File uploads
- Most CRUD operations

### Use Direct Database For:
- Database migrations
- Complex analytics queries
- Bulk operations
- Admin functions
- Operations requiring elevated privileges 