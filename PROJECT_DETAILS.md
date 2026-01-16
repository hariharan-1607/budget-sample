# Project Overview: Personal Budget Manager

This document provides a detailed overview of the Personal Budget Manager application, including the connection between the frontend and backend, configuration details, and screenshots of the application flow.

## 1. Technology Stack

-   **Frontend**: React (Vite), TypeScript, Tailwind CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (Local Instance)
-   **State Management**: React Context (`AuthContext`)

## 2. Architecture & Connection Details

The application consists of a **Frontend** client and a **Backend** server which communicate via REST API.

-   **Frontend (Client)**
    -   **URL**: `http://localhost:5173`
    -   **Framework**: React with Vite
    -   **Communication**: Sends HTTP requests (`POST`, `GET`) to the Backend API.

-   **Backend (Server)**
    -   **URL**: `http://localhost:5000`
    -   **API Prefix**: `/api/auth` (for authentication routes)
    -   **Database Connection**: Connects to a local MongoDB instance running at `mongodb://localhost:27017/budgetbuddy`.

### Data Flow
1.  **User Action**: User enters details on the generic Signup/Login form.
2.  **API Call**: Frontend sends a JSON payload to `http://localhost:5000/api/auth/signup` or `/login`.
    -   *Signup Payload*: `{ "name": "...", "email": "...", "password": "..." }`
    -   *Login Payload*: `{ "email": "...", "password": "..." }`
3.  **Processing**: Backend receives the request, validates data, hashes the password (using `bcryptjs`), and interacts with MongoDB.
4.  **Response**: Backend sends back a success message and/or a JWT token/User object.
5.  **State Update**: Frontend updates `AuthContext` and redirects the user to the Dashboard.

## 3. Project Configuration

### Backend (`/backend`)
-   **`server.js`**: The main entry point. Configured with `cors` to allow requests from the frontend, and `dotenv` for environment variables.
-   **`routes/authRoutes.js`**: Handles `/signup` and `/login` endpoints.
-   **`config/db.js`**: Managed the connection to the MongoDB database.
-   **`.env` File**:
    ```ini
    MONGO_URI=mongodb://localhost:27017/budgetbuddy
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

### Frontend (`/frontend`)
-   **`src/context/AuthContext.tsx`**: Manages global user state and API calls.
-   **`src/pages/Signup.tsx`**: Registration form including "Full Name", "Email", and "Password".
-   **`src/pages/Login.tsx`**: Login form.

## 4. Application Screenshots

### Signup Page
The signup page allows new users to register by providing their Full Name, Email, and Password.
![Signup Page](/signup_page_screenshot.png)

### Login Page
Existing users can access their account using their email and password.
![Login Page](/login_page_screenshot.png)

### Dashboard
Once authenticated, users are redirected to the Dashboard where they can manage their budgets.
![Dashboard](/dashboard_screenshot.png)

## 5. How to Run

1.  **Start MongoDB**: Ensure your local MongoDB instance is running.
2.  **Start Backend**:
    ```bash
    cd backend
    npm start
    ```
    *Runs on port 5000.*
3.  **Start Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```
    *Runs on port 5173.*

## 6. Recent Changes & Fixes
-   **Frontend-Backend Connection**: API endpoints were wired up in `AuthContext`.
-   **Name Field**: Added "Full Name" input to the Signup UI and Backend User model.
-   **Database**: Switched from a failing Cloud MongoDB connection to a stable Local MongoDB connection.
-   **CORS**: Enabled Cross-Origin Resource Sharing on the backend to allow the frontend to communicate with it.
