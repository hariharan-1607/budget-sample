require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');
const authRoutes = require('./routes/authRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS must be configured properly
app.use(cors({
  origin: true, // Allow all origins in development, configure for production
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware with error handling
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Test Supabase connection
supabase.from('users').select('count').limit(1)
  .then(() => {
    console.log('✅ Supabase Connected');
  })
  .catch(err => {
    console.error('❌ Supabase Connection Failed:', err.message);
  });

// Health check route
app.get('/', (req, res) => {
    res.json({ msg: 'Budget Manager API is running!', status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
    res.json({ msg: 'Budget Manager API is running!', status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/budgets', budgetRoutes);

// 404 handler - must return JSON
app.use((req, res) => {
    res.status(404).json({ 
        msg: 'Route not found', 
        path: req.path,
        method: req.method 
    });
});

// Global Error Handler - ensures all errors return JSON
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    
    // Ensure we always send JSON response
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({ 
        msg: message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        timestamp: new Date().toISOString()
    });
});

// Export the app for serverless functions
module.exports = app;

// Only listen if not running in a serverless environment
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}
