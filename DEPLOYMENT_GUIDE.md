# Deployment Guide - Budget Manager (MERN Stack with Supabase)

This guide will help you deploy your Budget Manager application to Netlify with Supabase as the database.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Netlify account (sign up at https://netlify.com)
3. Node.js installed locally (for testing)

## Step 1: Set Up Supabase Database

1. **Create a new Supabase project:**
   - Go to https://app.supabase.com
   - Click "New Project"
   - Fill in your project details
   - Wait for the project to be created

2. **Run the database schema:**
   - In your Supabase dashboard, go to "SQL Editor"
   - Copy the contents of `supabase-schema.sql`
   - Paste and run it in the SQL Editor
   - This will create the `users`, `budgets`, and `expenses` tables

3. **Get your Supabase credentials:**
   - Go to "Settings" → "API"
   - Copy your "Project URL" (this is your `SUPABASE_URL`)
   - Copy your "anon public" key (this is your `SUPABASE_ANON_KEY`)

## Step 2: Configure Environment Variables

### For Local Development:

1. Create a `.env` file in the `backend` folder:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_strong_random_secret_key
   PORT=5000
   ```

2. Create a `.env` file in the `frontend` folder (optional, for local API URL):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### For Netlify Deployment:

1. In your Netlify dashboard:
   - Go to your site → "Site settings" → "Environment variables"
   - Add the following variables:
     - `SUPABASE_URL` = your Supabase project URL
     - `SUPABASE_ANON_KEY` = your Supabase anon key
     - `JWT_SECRET` = a strong random secret key

## Step 3: Install Dependencies

Run these commands in your project root:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Step 4: Test Locally

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
   The server should start on `http://localhost:5000`

2. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend should start on `http://localhost:5173`

3. **Test the application:**
   - Sign up a new user
   - Create a budget
   - Add expenses
   - Verify data is saved in Supabase (check the Supabase dashboard)

## Step 5: Deploy to Netlify

### Option 1: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize Netlify:**
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Follow the prompts

4. **Set environment variables:**
   ```bash
   netlify env:set SUPABASE_URL your_supabase_url
   netlify env:set SUPABASE_ANON_KEY your_supabase_anon_key
   netlify env:set JWT_SECRET your_jwt_secret
   ```

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### Option 2: Deploy via Netlify Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Configure build settings:**
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`

4. **Set environment variables:**
   - Go to "Site settings" → "Environment variables"
   - Add all required variables (see Step 2)

5. **Deploy:**
   - Click "Deploy site"
   - Wait for the build to complete

## Step 6: Verify Deployment

1. **Check your Netlify site URL**
2. **Test the application:**
   - Sign up a new user
   - Create budgets and expenses
   - Verify data persists (check Supabase dashboard)

## Troubleshooting

### Backend not working on Netlify:
- Check that environment variables are set correctly
- Check Netlify function logs in the dashboard
- Verify the `netlify.toml` configuration

### Database connection errors:
- Verify Supabase credentials are correct
- Check that the database schema was created
- Ensure your Supabase project is active

### CORS errors:
- The backend already includes CORS middleware
- If issues persist, check Netlify redirects configuration

### Frontend can't connect to backend:
- Verify the API URL is correct (should be `/api` for Netlify)
- Check browser console for errors
- Verify Netlify redirects are working

## Project Structure

```
budget-sample/
├── backend/              # Express.js backend
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth middleware
│   ├── models/          # Data models (legacy, not used with Supabase)
│   ├── routes/          # API routes
│   └── server.js        # Express server
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Auth context
│   │   └── pages/       # Page components
│   └── dist/            # Build output
├── netlify/
│   └── functions/       # Netlify serverless functions
├── netlify.toml         # Netlify configuration
├── supabase-schema.sql  # Database schema
└── package.json         # Root package.json
```

## API Endpoints

### Authentication:
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Budgets (requires authentication):
- `GET /api/budgets` - Get all budgets for user
- `POST /api/budgets` - Create a new budget
- `PUT /api/budgets/:id` - Update a budget
- `DELETE /api/budgets/:id` - Delete a budget

### Expenses (requires authentication):
- `POST /api/budgets/:budgetId/expenses` - Add expense to budget
- `PUT /api/budgets/:budgetId/expenses/:expenseId` - Update expense
- `DELETE /api/budgets/:budgetId/expenses/:expenseId` - Delete expense

## Security Notes

- Never commit `.env` files to Git
- Use strong JWT secrets in production
- Supabase Row Level Security (RLS) can be enabled for additional security
- Consider enabling HTTPS only in Netlify settings
