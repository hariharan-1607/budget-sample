// Load environment variables first
require('dotenv').config({ path: '../../backend/.env' });

const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const supabase = require('../../backend/config/supabase');
const authRoutes = require('../../backend/routes/authRoutes');
const budgetRoutes = require('../../backend/routes/budgetRoutes');

const app = express();

// Middleware - CORS must be configured properly
app.use(cors({
  origin: true, // Allow all origins
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

// Wrap the serverless handler with error handling
const handler = serverless(app, {
  binary: ['image/*', 'application/pdf']
});

exports.handler = async (event, context) => {
  try {
    // Set context to not wait for empty event loop
    context.callbackWaitsForEmptyEventLoop = false;
    
    console.log('Incoming request:', event.httpMethod, event.path);
    
    // Call the serverless handler
    const result = await handler(event, context);
    
    // Ensure we always return a proper response with JSON content-type
    if (!result) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        body: JSON.stringify({ 
          msg: 'Internal server error',
          error: 'No response from handler'
        })
      };
    }
    
    // Ensure content-type is set to JSON
    if (!result.headers) {
      result.headers = {};
    }
    if (!result.headers['content-type'] && !result.headers['Content-Type']) {
      result.headers['Content-Type'] = 'application/json';
    }
    
    return result;
  } catch (error) {
    console.error('Serverless function error:', error);
    
    // Return a proper JSON error response
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify({ 
        msg: 'Internal server error',
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
