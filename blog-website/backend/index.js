const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const blogRoutes = require('./routes/blogRoutes');



// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'], // Replace with your frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allows cookies to be sent with requests
}));

// Routes
app.use('/api/blog', blogRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});