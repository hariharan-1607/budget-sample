# Budget Manager Application

A full-stack budget management application built with React, Express, and Supabase, deployed on Netlify.

## Features

- 🔐 User authentication (signup/login)
- 💰 Create and manage budgets
- 📊 Track expenses by category
- 📱 Responsive design with Tailwind CSS
- ☁️ Serverless deployment on Netlify
- 🗄️ Supabase PostgreSQL database

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Express.js
- Supabase (PostgreSQL)
- JWT authentication
- Bcrypt for password hashing
- Serverless functions (Netlify Functions)

## Project Structure

```
budget-sample/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context (Auth)
│   │   ├── pages/         # Page components
│   │   └── main.tsx       # Entry point
│   └── dist/              # Build output
├── backend/               # Express backend
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   └── server.js         # Express app
├── netlify/
│   └── functions/        # Netlify serverless functions
│       └── server.js     # Main API handler
├── supabase-schema.sql   # Database schema
└── netlify.toml          # Netlify configuration
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Supabase account
- A Netlify account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd budget-sample
   ```

2. **Install dependencies**
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

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the schema from [`supabase-schema.sql`](supabase-schema.sql)
   - Get your project URL and anon key from Project Settings > API

4. **Configure environment variables**
   
   Create [`backend/.env`](backend/.env):
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_random_secret_key
   PORT=5000
   ```
   
   Create [`frontend/.env`](frontend/.env):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Run the development servers**
   
   Terminal 1 - Backend:
   ```bash
   cd backend
   node server.js
   ```
   
   Terminal 2 - Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## Deployment to Netlify

Follow the comprehensive guide in [`NETLIFY_DEPLOYMENT.md`](NETLIFY_DEPLOYMENT.md)

### Quick Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect settings from [`netlify.toml`](netlify.toml)

3. **Set environment variables in Netlify**
   - Go to Site settings > Environment variables
   - Add:
     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`
     - `JWT_SECRET`
     - `NODE_ENV=production`

4. **Deploy!**
   - Netlify will automatically build and deploy your site
   - Your site will be live at `https://your-site.netlify.app`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Budgets
- `GET /api/budgets` - Get all budgets (authenticated)
- `POST /api/budgets` - Create a new budget (authenticated)
- `PUT /api/budgets/:id` - Update a budget (authenticated)
- `DELETE /api/budgets/:id` - Delete a budget (authenticated)

### Expenses
- `POST /api/budgets/:budgetId/expenses` - Add expense to budget
- `PUT /api/budgets/:budgetId/expenses/:expenseId` - Update expense
- `DELETE /api/budgets/:budgetId/expenses/:expenseId` - Delete expense

## Database Schema

The application uses three main tables:

- **users** - User accounts with authentication
- **budgets** - Budget entries linked to users
- **expenses** - Expense entries linked to budgets

See [`supabase-schema.sql`](supabase-schema.sql) for the complete schema.

## Troubleshooting

### "Unexpected token 'A', "An error o"... is not valid JSON"

This error occurs when the API returns HTML instead of JSON. Solutions:
1. Verify environment variables are set in Netlify dashboard
2. Check Netlify function logs for detailed errors
3. Ensure Supabase credentials are correct

### CORS Errors

The backend is configured to allow all origins. If you still face CORS issues:
1. Check that API requests use the correct URL
2. Verify the Netlify function is deployed correctly

### Database Connection Issues

1. Verify Supabase credentials in environment variables
2. Check that the Supabase project is active
3. Ensure the database schema is created correctly

## Environment Variables

### Backend (Required)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `JWT_SECRET` - Secret key for JWT tokens (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

### Frontend (Development Only)
- `VITE_API_URL` - API URL for development (default: `/api` in production)

## Security Notes

- Never commit `.env` files to Git
- Use strong JWT secrets (32+ characters)
- Regularly rotate your JWT secret
- Enable Supabase Row Level Security (RLS) policies
- Monitor Supabase usage and set up alerts

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the [`NETLIFY_DEPLOYMENT.md`](NETLIFY_DEPLOYMENT.md) guide
2. Review Netlify function logs
3. Check Supabase logs
4. Open an issue on GitHub

## Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Supabase](https://supabase.com)
- Deployed on [Netlify](https://netlify.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)
