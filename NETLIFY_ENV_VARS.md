# Netlify Environment Variables

## Quick Setup

Go to your Netlify site dashboard → **Site settings** → **Environment variables** and add these:

### Required Environment Variables

```
SUPABASE_URL
https://ptjbooculkoahrwefnrg.supabase.co

SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0amJvb2N1bGtvYWhyd2VmbnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxODYzODgsImV4cCI6MjA4NTc2MjM4OH0.pxtUazYXCME0EK442NRiKTxcYtSv0xdtFj6i1d-6NG8

JWT_SECRET
q5aoHsqKMHs168Y3Ah6Mg5Jn/ow5TawWnIu3C+5I+8iTme0wCOtRwuNkN1t1IKIin4vRCtPekR8mDj/askjhYw==

NODE_ENV
production
```

## Steps to Add in Netlify

1. Go to https://app.netlify.com
2. Select your site
3. Click **Site settings** in the top menu
4. Click **Environment variables** in the left sidebar
5. Click **Add a variable**
6. For each variable above:
   - Enter the **Key** (e.g., `SUPABASE_URL`)
   - Enter the **Value** (copy from above)
   - Click **Create variable**
7. After adding all 4 variables, go to **Deploys**
8. Click **Trigger deploy** → **Clear cache and deploy site**

## Verify Setup

After deployment completes:
1. Visit your Netlify site URL
2. Try to sign up with a test account
3. Try to log in
4. If it works, you're all set!

## Troubleshooting

### If signup/login still fails:

1. **Check Netlify Function Logs**:
   - Go to **Functions** in Netlify dashboard
   - Click on **server** function
   - Check the logs for errors

2. **Verify Supabase Tables**:
   - Go to Supabase dashboard
   - Click **Table Editor**
   - Verify `users`, `budgets`, and `expenses` tables exist

3. **Re-run SQL Schema**:
   - If tables don't exist, go to **SQL Editor** in Supabase
   - Copy content from [`supabase-schema.sql`](supabase-schema.sql)
   - Click **Run**

4. **Check Environment Variables**:
   - In Netlify, go to **Site settings** → **Environment variables**
   - Verify all 4 variables are set correctly
   - Make sure there are no extra spaces or line breaks

5. **Trigger New Deploy**:
   - After fixing any issues, always trigger a new deploy
   - Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

## Important Notes

- ⚠️ Never share these credentials publicly
- ⚠️ The anon key is safe to use in frontend/backend (it has limited permissions)
- ⚠️ Never use the service_role key in your application
- ✅ These credentials are already in your local [`backend/.env`](backend/.env) file
- ✅ The `.env` file is in `.gitignore` so it won't be committed to Git
