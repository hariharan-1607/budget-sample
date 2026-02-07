# Quick Start Checklist

## ✅ Step 1: Set Up Supabase Database (IMPORTANT - Fixes the "user_id" error)

1. Go to https://app.supabase.com
2. Open your project (or create a new one)
3. Go to **SQL Editor** (left sidebar)
4. Click **"New Query"**
5. Open the file `supabase-schema-fixed.sql` from this project
6. **Copy the ENTIRE contents** and paste into the SQL Editor
7. Click **"Run"** (or press Ctrl+Enter)
8. You should see "Success" message
9. Verify: Go to **Table Editor** - you should see 3 tables: `users`, `budgets`, `expenses`

## ✅ Step 2: Configure Environment Variables

1. Open `backend/.env` file
2. Replace the placeholder values with your actual Supabase credentials:

```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your-random-secret-here
PORT=5000
```

**To get your Supabase credentials:**
- Go to Supabase Dashboard → Settings → API
- Copy "Project URL" → `SUPABASE_URL`
- Copy "anon public" key → `SUPABASE_ANON_KEY`

**To generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## ✅ Step 3: Verify Schema (Optional but Recommended)

```bash
cd backend
npm run verify-schema
```

This will check if your database tables are set up correctly.

## ✅ Step 4: Test Backend

Open a terminal:
```bash
cd backend
npm start
```

You should see:
```
✅ Supabase Connected
Server running on port 5000
```

**Keep this terminal open!**

## ✅ Step 5: Test Frontend

Open a NEW terminal:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

## ✅ Step 6: Test the Application

1. Open browser: http://localhost:5173
2. Click "Sign Up" and create an account
3. Log in
4. Create a budget
5. Add expenses

## ✅ Step 7: Deploy to Netlify

See `SETUP_INSTRUCTIONS.md` for detailed deployment steps.

---

## 🐛 Troubleshooting

### Error: "column user_id does not exist"
**Solution:** You haven't run the SQL schema. Go back to Step 1 and run `supabase-schema-fixed.sql` in Supabase SQL Editor.

### Error: "Failed to connect to Supabase"
**Solution:** Check your `.env` file - make sure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct (no extra spaces, full URLs).

### Backend won't start
**Solution:** Make sure `.env` file exists in `backend` folder and has all required variables.

### Frontend can't connect to backend
**Solution:** Make sure backend is running on port 5000. Check the terminal where you ran `npm start` in the backend folder.
