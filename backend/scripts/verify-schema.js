// Script to verify Supabase schema is set up correctly
require('dotenv').config();
const supabase = require('../config/supabase');

async function verifySchema() {
  console.log('🔍 Verifying Supabase schema...\n');

  try {
    // Check if users table exists and has correct columns
    console.log('1. Checking users table...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, name, email, password, created_at, updated_at')
      .limit(1);

    if (usersError && usersError.code === '42P01') {
      console.error('❌ Users table does not exist!');
      console.error('   Please run the SQL schema in Supabase SQL Editor\n');
      return false;
    } else if (usersError) {
      console.error('❌ Error checking users table:', usersError.message);
      return false;
    }
    console.log('✅ Users table exists\n');

    // Check if budgets table exists and has correct columns
    console.log('2. Checking budgets table...');
    const { data: budgets, error: budgetsError } = await supabase
      .from('budgets')
      .select('id, user_id, name, total_amount, created_at, updated_at')
      .limit(1);

    if (budgetsError && budgetsError.code === '42P01') {
      console.error('❌ Budgets table does not exist!');
      console.error('   Please run the SQL schema in Supabase SQL Editor\n');
      return false;
    } else if (budgetsError && budgetsError.code === '42703') {
      console.error('❌ Budgets table exists but column "user_id" is missing!');
      console.error('   Please run the SQL schema again in Supabase SQL Editor\n');
      return false;
    } else if (budgetsError) {
      console.error('❌ Error checking budgets table:', budgetsError.message);
      return false;
    }
    console.log('✅ Budgets table exists with correct columns\n');

    // Check if expenses table exists
    console.log('3. Checking expenses table...');
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select('id, budget_id, category, amount, description, date, created_at')
      .limit(1);

    if (expensesError && expensesError.code === '42P01') {
      console.error('❌ Expenses table does not exist!');
      console.error('   Please run the SQL schema in Supabase SQL Editor\n');
      return false;
    } else if (expensesError) {
      console.error('❌ Error checking expenses table:', expensesError.message);
      return false;
    }
    console.log('✅ Expenses table exists\n');

    console.log('✅ All tables verified successfully!');
    console.log('✅ Schema is set up correctly.\n');
    return true;
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    return false;
  }
}

// Run verification
verifySchema()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
