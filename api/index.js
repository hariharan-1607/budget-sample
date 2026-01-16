console.log("Loading Backend Server...");
try {
    const app = require('../backend/server');
    console.log("Backend Server Loaded Successfully");
    module.exports = app;
} catch (error) {
    console.error("FATAL: Failed to load backend server:");
    console.error(error);

    // Fallback minimal app to report error
    const express = require('express');
    const app = express();
    app.all('*', (req, res) => {
        res.status(500).json({
            msg: "Serverless Function Failed to Initialize",
            error: error.message,
            stack: error.stack
        });
    });
    module.exports = app;
}
