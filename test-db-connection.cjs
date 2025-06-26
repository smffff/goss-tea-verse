require('dotenv').config({ path: '.env.local' });
const { executeQuery } = require('./src/utils/database.cjs');

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    
    // Test basic connection
    const result = await executeQuery('SELECT NOW() as current_time');
    console.log('✅ Database connected successfully!');
    console.log('🕐 Current database time:', result.rows[0].current_time);
    
    // Test if we can see your tables
    const tables = await executeQuery(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log('\n📋 Available tables:');
    tables.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    
    // Test tea_submissions table if it exists
    const teaSubmissions = tables.rows.find(row => row.table_name === 'tea_submissions');
    if (teaSubmissions) {
      const count = await executeQuery('SELECT COUNT(*) as count FROM tea_submissions');
      console.log(`\n🍵 Tea submissions count: ${count.rows[0].count}`);
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure your .env.local file exists');
    console.log('2. Check that DATABASE_URL is set correctly');
    console.log('3. Verify your database password is correct');
    console.log('4. Ensure your IP is allowed in Supabase dashboard');
  }
}

testConnection(); 