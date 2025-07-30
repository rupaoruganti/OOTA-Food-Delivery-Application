require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/authRoutes');
const feedbackRoute = require('./routes/feedbackRoute');
const app = express();

// Enable CORS with default settings
const corsOptions = {
  origin: 'http://localhost:3000', // Make sure this matches your frontend URL
  credentials: true,              // Allow credentials like cookies to be sent
};
app.use(cors(corsOptions));       // Enable CORS with your specific settings

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', feedbackRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ootaog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to ootaog MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// If you need to connect to multiple databases, use createConnection for each
const feedbackDb = mongoose.createConnection('mongodb://localhost:27017/ootaFeedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

feedbackDb.on('connected', () => {
  console.log('Connected to ootaFeedback MongoDB');
});
feedbackDb.on('error', (err) => {
  console.error('MongoDB connection error (feedback):', err);
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
