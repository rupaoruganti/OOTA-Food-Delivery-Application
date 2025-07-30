// routes/feedbackRoute.js
const express = require('express');
const Feedback = require('../models/feedbackModel');
const router = express.Router();

// POST route to submit feedback
router.post('/feedback', async (req, res) => {
  const { name, email, message } = req.body;

  // Check for required fields
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required fields' });
  }

  try {
    const newFeedback = new Feedback({
      name,
      email,
      message: message || 'NAN', // Default message if none is provided
    });

    await newFeedback.save();
    res.status(200).json({ message: 'Thank you for your feedback!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback, please try again later.' });
  }
});

// Optional: GET route to retrieve feedback (if needed for admin dashboard or other uses)
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Sorted by newest
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    res.status(500).json({ message: 'Failed to retrieve feedback' });
  }
});

module.exports = router;
