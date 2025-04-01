const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/budgetbuddy')

.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
