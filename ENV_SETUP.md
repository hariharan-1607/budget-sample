# Environment Variables Setup

## Backend Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# JWT Secret (use a strong random string)
JWT_SECRET=your_jwt_secret_key_here

# Server Port (optional, defaults to 5000)
PORT=5000
```

## Frontend Environment Variables (Optional)

Create a `.env` file in the `frontend` folder if you want to override the API URL:

```env
# API URL (defaults to /api for production)
VITE_API_URL=http://localhost:5000/api
```

## Getting Supabase Credentials

1. Go to https://app.supabase.com
2. Select your project (or create a new one)
3. Go to "Settings" → "API"
4. Copy the "Project URL" → This is your `SUPABASE_URL`
5. Copy the "anon public" key → This is your `SUPABASE_ANON_KEY`

## Generating JWT Secret

You can generate a secure JWT secret using:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use any random string generator
```

## Netlify Environment Variables

When deploying to Netlify, set these environment variables in:
- Netlify Dashboard → Your Site → Site settings → Environment variables

Add:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `JWT_SECRET`
