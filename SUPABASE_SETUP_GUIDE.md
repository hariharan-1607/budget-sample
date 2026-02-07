# Supabase Setup Guide

## Your Supabase Project Details

**Project URL**: `https://ptjbooculkoahrwefnrg.supabase.co`
**Project ID**: `ptjbooculkoahrwefnrg`

## Step 1: Run the SQL Schema

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/ptjbooculkoahrwefnrg
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the ENTIRE content from [`supabase-schema.sql`](supabase-schema.sql)
5. Click **Run** or press `Ctrl+Enter`
6. You should see "Success. No rows returned" - this is correct!

## Step 2: Get Your API Keys

1. Go to **Project Settings** (gear icon in left sidebar)
2. Click on **API** in the settings menu
3. You'll see two keys:
   - **anon/public key** - This is what you need for `SUPABASE_ANON_KEY`
   - **service_role key** - DO NOT use this in your app (it bypasses RLS)

## Step 3: Update Environment Variables

### For Local Development

Update [`backend/.env`](backend/.env):
```env
SUPABASE_URL=https://ptjbooculkoahrwefnrg.supabase.co
SUPABASE_ANON_KEY=<paste your anon/public key here>
JWT_SECRET=q5aoHsqKMHs168Y3Ah6Mg5Jn/ow5TawWnIu3C+5I+8iTme0wCOtRwuNkN1t1IKIin4vRCtPekR8mDj/askjhYw==
PORT=5000
NODE_ENV=development
```

### For Netlify Deployment

1. Go to your Netlify site dashboard
2. Click **Site settings** > **Environment variables**
3. Add these variables:
   - `SUPABASE_URL` = `https://ptjbooculkoahrwefnrg.supabase.co`
   - `SUPABASE_ANON_KEY` = `<paste your anon/public key from Supabase>`
   - `JWT_SECRET` = `q5aoHsqKMHs168Y3Ah6Mg5Jn/ow5TawWnIu3C+5I+8iTme0wCOtRwuNkN1t1IKIin4vRCtPekR8mDj/askjhYw==`
   - `NODE_ENV` = `production`
4. Click **Save**
5. Go to **Deploys** and click **Trigger deploy** > **Clear cache and deploy site**

## Step 4: Verify Database Tables

After running the SQL schema, verify the tables were created:

1. In Supabase dashboard, click **Table Editor**
2. You should see three tables:
   - `users` - For user authentication
   - `budgets` - For budget management
   - `expenses` - For expense tracking

## Step 5: Test Locally

1. Make sure you've updated [`backend/.env`](backend/.env) with the correct `SUPABASE_ANON_KEY`
2. Start the backend:
   ```bash
   cd backend
   node server.js
   ```
3. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
4. Test signup and login at http://localhost:5173

## Troubleshooting

### Error: "column user_id does not exist"
**Solution**: This was caused by incorrect RLS policies. The updated [`supabase-schema.sql`](supabase-schema.sql) now has correct policies that allow all operations via API key.

### Error: "Invalid API key"
**Solution**: 
1. Go to Supabase dashboard > Project Settings > API
2. Copy the **anon/public key** (NOT the service_role key)
3. Update your environment variables

### Signup/Login fails on deployed site
**Solution**:
1. Check Netlify environment variables are set correctly
2. Trigger a new deploy after setting environment variables
3. Check Netlify function logs for errors
4. Verify Supabase tables were created correctly

## Important Notes

1. **Never commit `.env` files** - They're already in `.gitignore`
2. **Use anon key, not service_role key** - The service_role key bypasses all security
3. **RLS is enabled** - But policies allow all operations for API key access (your backend handles authorization)
4. **JWT Secret** - Using your Supabase JWT secret for consistency

## Next Steps

After completing the setup:
1. Run the SQL schema in Supabase
2. Get your anon key from Supabase
3. Update [`backend/.env`](backend/.env) with the anon key
4. Test locally
5. Update Netlify environment variables
6. Trigger a new deploy
7. Test the deployed site
