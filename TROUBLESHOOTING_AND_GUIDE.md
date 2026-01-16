# Project Troubleshooting & User Guide

This document contains your required credentials, a guide to viewing user data, and a log of errors encountered and resolved during the integration process.

## 1. Your Credentials

For Vercel deployment, you need to set these in **Environment Variables**:

*   **MONGO\_URI**:
    ```text
    mongodb+srv://haribala112006:Hari2006@budget-cluster.tuh3nho.mongodb.net/?retryWrites=true&w=majority&appName=Budget-Cluster
    ```
    *(Note: This was found in your original source code. Since it contains your password, keep it secret!)*

*   **JWT\_SECRET**:
    You can use any secure random string. For example:
    ```text
    my_secure_budget_secret_2025
    ```

## 2. How to View User Data (MongoDB)

### Option A: Local Database (Where we verified the code)
Since we used a local MongoDB instance for testing:
1.  Download and install **MongoDB Compass** (Official GUI).
2.  Open Compass and connect to: `mongodb://localhost:27017`.
3.  In the left sidebar, find the database named **`budgetbuddy`**.
4.  Click on the **`users`** collection.
5.  You will see the JSON documents for users we created (e.g., "Test User 2").

### Option B: Cloud Database (Production/Vercel)
When deployed to Vercel with the `MONGO_URI` above:
1.  Log in to [MongoDB Atlas](https://www.mongodb.com/atlas).
2.  Go to **Database** -> **Browse Collections**.
3.  Select your database and the **`users`** collection.
4.  You can view, edit, or delete user accounts directly here.

## 3. Errors Encountered & Resolutions

### Issue 1: Disconnected Frontend & Backend
*   **Error**: Clicking "Signup" on the frontend did nothing; the form reset or showed generic errors. The backend had routes defined (`authRoutes.js`) but they were not connected in `server.js` or called by the frontend.
*   **Resolution**:
    *   **Backend**: Mounted `authRoutes` at `/api/auth`.
    *   **Frontend**: Updated `AuthContext.tsx` to use `fetch` calls to endpoints `/api/auth/signup` and `/api/auth/login`.

### Issue 2: Cloud MongoDB Connection Failure
*   **Error**: `querySrv ENOTFOUND _mongodb._tcp...`
    *   The backend failed to start because it could not reach the Cloud MongoDB instance (likely due to network restrictions or DNS issues on the local machine).
*   **Resolution**:
    *   Switched the local environment (`.env`) to use a **Local MongoDB** instance (`mongodb://localhost:27017/budgetbuddy`).
    *   This allowed us to verify the entire signup/login flow successfully locally.

### Issue 3: Missing User Data
*   **Error**: The frontend allowed entering a "Name" but the backend `User` model required it, and the API wasn't sending it.
*   **Resolution**:
    *   Added a "Full Name" input field to `Signup.tsx`.
    *   Updated the Backend `User` model (it already had `name`, but the frontend wasn't sending it).
    *   Updated the API payload to include `name`.

### Issue 4: Vercel Deployment (404 / CORS)
*   **Error**: Deploying separate frontend/backend folders often leads to CORS issues or 404s because Vercel treats them as static files.
*   **Resolution**:
    *   Created `vercel.json` to handle routing:
        *   `/api/*` -> Rewrites to Backend Server.
        *   `/*` -> Rewrites to Frontend.
    *   Configured Frontend to use relative paths (`/api/auth/...`) so requests work automatically on both Vercel and Local (via Vite proxy).
