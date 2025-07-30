const mongoose = require('mongoose');

// Define a schema for the feedback
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, default: 'NAN' }, // Default value 'NAN' if no message is provided
  createdAt: { type: Date, default: Date.now }
}, { collection: 'ootaFeedback' }); // Specify collection name

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
