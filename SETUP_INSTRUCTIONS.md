# Setup Instructions - Step by Step

Follow these steps in order to set up your Budget Manager application.

## Step 1: Set Up Supabase Database

1. **Create a Supabase account and project:**
   - Go to https://supabase.com
   - Sign up or log in
   - Click "New Project"
   - Fill in project details (name, database password, region)
   - Wait for project to be created (takes 1-2 minutes)

2. **Get your Supabase credentials:**
   - In your Supabase dashboard, go to "Settings" → "API"
   - Copy the "Project URL" (you'll need this for `SUPABASE_URL`)
   - Copy the "anon public" key (you'll need this for `SUPABASE_ANON_KEY`)

3. **Run the database schema:**
   - In Supabase dashboard, go to "SQL Editor"
   - Click "New Query"
   - Open the file `supabase-schema-fixed.sql` from this project
   - Copy the ENTIRE contents
   - Paste into the SQL Editor
   - Click "Run" (or press Ctrl+Enter)
   - You should see "Success. No rows returned" or similar success message

4. **Verify the schema was created:**
   - In Supabase dashboard, go to "Table Editor"
   - You should see three tables: `users`, `budgets`, and `expenses`
   - If you don't see them, go back and run the SQL again

## Step 2: Configure Environment Variables

1. **Create `.env` file in the `backend` folder:**
   ```bash
   cd backend
   ```

2. **Create the `.env` file** (create a new file named `.env`):
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   JWT_SECRET=your-random-secret-key-here-make-it-long-and-random
   PORT=5000
   ```

3. **Fill in the values:**
   - `SUPABASE_URL`: Paste your Project URL from Step 1.2
   - `SUPABASE_ANON_KEY`: Paste your anon public key from Step 1.2
   - `JWT_SECRET`: Generate a random string (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `PORT`: Keep as 5000 (or change if needed)

## Step 3: Install Dependencies

Open a terminal in the project root and run:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 4: Verify Database Schema

Before testing, verify your database schema is correct:

```bash
cd backend
npm run verify-schema
```

You should see:
```
✅ Users table exists
✅ Budgets table exists with correct columns
✅ Expenses table exists
✅ All tables verified successfully!
```

If you see errors, go back to Step 1 and make sure you ran the SQL schema correctly.

## Step 5: Test Locally

### Start the Backend Server:

Open a terminal and run:
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

### Start the Frontend:

Open a NEW terminal and run:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Test the Application:

1. Open your browser and go to `http://localhost:5173`
2. Click "Sign Up" and create a new account
3. After signing up, you'll be redirected to login
4. Log in with your credentials
5. You should see the Dashboard
6. Try creating a budget and adding expenses

### Verify Data in Supabase:

1. Go to your Supabase dashboard
2. Go to "Table Editor"
3. Click on the `users` table - you should see your new user
4. Create a budget in the app, then check the `budgets` table
5. Add an expense, then check the `expenses` table

## Step 6: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Recommended for first time)

1. **Push your code to GitHub:**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin https://github.com/yourusername/your-repo.git
     git push -u origin main
     ```

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Sign up or log in
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

3. **Configure build settings:**
   - Build command: `npm install && cd backend && npm install && cd ../frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`

4. **Set environment variables:**
   - Go to "Site settings" → "Environment variables"
   - Click "Add a variable"
   - Add these three variables:
     - `SUPABASE_URL` = your Supabase URL
     - `SUPABASE_ANON_KEY` = your Supabase anon key
     - `JWT_SECRET` = your JWT secret (same as in .env)

5. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete (5-10 minutes)
   - Your site will be live at `https://your-site-name.netlify.app`

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify
netlify init

# Set environment variables
netlify env:set SUPABASE_URL your_supabase_url
netlify env:set SUPABASE_ANON_KEY your_supabase_anon_key
netlify env:set JWT_SECRET your_jwt_secret

# Deploy
netlify deploy --prod
```

## Troubleshooting

### Error: "column user_id does not exist"
- **Solution:** The database schema wasn't created correctly. Go back to Step 1.3 and run the SQL schema again in Supabase SQL Editor.

### Error: "Failed to connect to Supabase"
- **Solution:** Check your `.env` file - make sure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct and don't have extra spaces.

### Error: "Cannot find module '@supabase/supabase-js'"
- **Solution:** Run `npm install` in the backend folder again.

### Backend starts but frontend can't connect
- **Solution:** Make sure backend is running on port 5000. Check the `VITE_API_URL` in frontend/.env or use the default `/api` which works with Vite proxy.

### Netlify deployment fails
- **Solution:** Check the build logs in Netlify dashboard. Make sure all environment variables are set correctly.

## Need Help?

- Check `DEPLOYMENT_GUIDE.md` for more detailed deployment info
- Check `ENV_SETUP.md` for environment variable details
- Check `MIGRATION_SUMMARY.md` for technical details about the migration
