const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user and save to the database
    const newUser = new User({ name, email, password, phone });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error details:', error.message, error.stack);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Route to get all feedback (for admin or display purposes)
router.post('/feedback', async (req, res) => {
    console.log('Feedback Submission Received'); // Debugging
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const feedback = new Feedback({
        name,
        email,
        message: message || 'NAN',
      });
  
      await feedback.save(); // Save to MongoDB
      console.log('Feedback Saved:', feedback); // Debugging
  
      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({ message: 'Error submitting feedback' });
    }
  });
  

module.exports = router;
