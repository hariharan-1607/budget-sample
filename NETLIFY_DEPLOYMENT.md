# Netlify Deployment Guide

## Prerequisites

1. A Supabase account with a project created
2. A Netlify account
3. Your code pushed to a GitHub repository

## Step 1: Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once created, go to **Project Settings** > **API**
3. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key**

4. Go to **SQL Editor** in Supabase and run the following schema:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create budgets table
CREATE TABLE IF NOT EXISTS budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_budgets_user_id ON budgets(user_id);
CREATE INDEX IF NOT EXISTS idx_budgets_date ON budgets(date);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (true);

-- Create policies for budgets table
CREATE POLICY "Users can read their own budgets" ON budgets
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own budgets" ON budgets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own budgets" ON budgets
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own budgets" ON budgets
  FOR DELETE USING (true);
```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard

1. Go to [Netlify](https://netlify.com) and log in
2. Click **"Add new site"** > **"Import an existing project"**
3. Connect your GitHub account and select your repository
4. Configure build settings:
   - **Build command**: `npm install && cd backend && npm install && cd ../frontend && npm install && npm run build`
   - **Publish directory**: `frontend/dist`
   - **Functions directory**: `netlify/functions`

5. Add environment variables in **Site settings** > **Environment variables**:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anon key
   - `JWT_SECRET`: A random secret string (generate one using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `NODE_ENV`: `production`

6. Click **"Deploy site"**

### Option B: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize your site:
```bash
netlify init
```

4. Set environment variables:
```bash
netlify env:set SUPABASE_URL "your_supabase_url"
netlify env:set SUPABASE_ANON_KEY "your_supabase_anon_key"
netlify env:set JWT_SECRET "your_jwt_secret"
netlify env:set NODE_ENV "production"
```

5. Deploy:
```bash
netlify deploy --prod
```

## Step 3: Verify Deployment

1. Once deployed, Netlify will provide you with a URL (e.g., `https://your-site.netlify.app`)
2. Visit the URL and test the signup/login functionality
3. Check the Netlify function logs for any errors:
   - Go to **Site overview** > **Functions** > **server**
   - Click on the function to see logs

## Troubleshooting

### Issue: "Unexpected token 'A', "An error o"... is not valid JSON"

**Solution**: This error occurs when the API returns HTML instead of JSON. Make sure:
1. Environment variables are set correctly in Netlify dashboard
2. The Supabase URL and key are valid
3. Check function logs for detailed error messages

### Issue: CORS errors

**Solution**: The backend is configured to allow all origins. If you still face CORS issues:
1. Check that the API requests are going to the correct URL
2. Ensure the frontend is using the correct API endpoint

### Issue: Database connection fails

**Solution**: 
1. Verify Supabase credentials in Netlify environment variables
2. Check that the Supabase project is active
3. Ensure the database schema is created correctly

## Frontend Configuration

The frontend automatically detects the API URL:
- In production (Netlify): Uses relative path `/api`
- In development: Uses `VITE_API_URL` from `.env` file

No additional configuration needed for Netlify deployment.

## Monitoring

1. **Function Logs**: Check Netlify dashboard > Functions > server
2. **Deploy Logs**: Check Netlify dashboard > Deploys > [latest deploy]
3. **Supabase Logs**: Check Supabase dashboard > Logs

## Updating the Site

To update your deployed site:
1. Push changes to your GitHub repository
2. Netlify will automatically rebuild and deploy
3. Or manually trigger a deploy from Netlify dashboard

## Custom Domain (Optional)

1. Go to **Site settings** > **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your DNS

## Security Notes

1. Never commit `.env` files to Git
2. Use strong JWT secrets (32+ characters)
3. Regularly rotate your JWT secret
4. Monitor Supabase usage and set up alerts
5. Enable Supabase RLS policies for production

## Support

If you encounter issues:
1. Check Netlify function logs
2. Check Supabase logs
3. Verify all environment variables are set correctly
4. Ensure the database schema is created
