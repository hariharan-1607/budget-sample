# Vercel Deployment Guide

## Prerequisites
- Supabase account with project created
- Vercel account
- GitHub repository

## Step 1: Set Up Supabase

1. Go to https://supabase.com/dashboard/project/ptjbooculkoahrwefnrg
2. Click **SQL Editor** → **New Query**
3. Copy ALL content from [`supabase-schema.sql`](supabase-schema.sql)
4. Paste and click **Run**
5. Verify tables in **Table Editor**: `users`, `budgets`, `expenses`

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New** → **Project**
3. Import your GitHub repository: `hariharan-1607/budget-sample`
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   ```
   SUPABASE_URL=https://ptjbooculkoahrwefnrg.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0amJvb2N1bGtvYWhyd2VmbnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxODYzODgsImV4cCI6MjA4NTc2MjM4OH0.pxtUazYXCME0EK442NRiKTxcYtSv0xdtFj6i1d-6NG8
   JWT_SECRET=q5aoHsqKMHs168Y3Ah6Mg5Jn/ow5TawWnIu3C+5I+8iTme0wCOtRwuNkN1t1IKIin4vRCtPekR8mDj/askjhYw==
   NODE_ENV=production
   ```

6. Click **Deploy**

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add JWT_SECRET
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

## Step 3: Verify Deployment

1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Test signup and login
3. Create budgets and expenses

## Environment Variables

Required variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon key
- `JWT_SECRET`: Your JWT secret
- `NODE_ENV`: Set to `production`

## Troubleshooting

### API Routes Not Working
- Verify [`vercel.json`](vercel.json) is in root directory
- Check that backend routes start with `/api/`
- Review Vercel function logs

### Database Connection Fails
- Verify Supabase credentials in Vercel environment variables
- Check Supabase project is active
- Ensure database schema is created

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure frontend builds successfully locally

## Project Structure

```
budget-sample/
├── frontend/          # React frontend
│   └── dist/         # Build output
├── backend/          # Express backend
│   └── server.js     # API routes
├── vercel.json       # Vercel configuration
└── supabase-schema.sql
```

## API Endpoints

All API routes are prefixed with `/api/`:
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/budgets` - Get budgets
- `POST /api/budgets` - Create budget
- And more...

## Monitoring

- **Vercel Dashboard**: Monitor deployments and logs
- **Supabase Dashboard**: Monitor database queries
- **Function Logs**: Check Vercel function logs for errors

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Click **Domains**
3. Add your custom domain
4. Configure DNS records as instructed

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- Check function logs for errors
