const mongoose = require('mongoose');

// Define the schema for a new event
const newEventSchema = new mongoose.Schema({
  eventImages: {
    type: [String], // Array of strings to store multiple image URLs or file paths
    required: [true, 'Please upload at least one event image.'], // Make it required with a custom message
  },
  eventName: {
    type: String,
    required: [true, 'Please provide an event name.'],
    trim: true, // Removes leading and trailing whitespace
  },
  date: {
    type: Date,
    required: [true, 'Please select a date for the event.'],
  },
  time: {
    type: String, // Storing time as a string (e.g., "HH:MM") is a common practice
    required: [true, 'Please select a time for the event.'],
  },
  location: {
    type: String,
    required: [true, 'Please provide the event location.'],
    trim: true,
  },
}, {
  timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
});

// Create a model using the schema
// You can name the model whatever you like, for example, 'Event'
const NewEvent = mongoose.model('Event', newEventSchema);

// Export the model to use it in other parts of your application
module.exports = NewEvent;