// Import the mongoose library to work with MongoDB
const mongoose = require("mongoose");

// Define a schema for the User model
const userSchema = new mongoose.Schema({
  // Full name of the user - required string field
  name: {
    type: String,
    required: true
  },

  // Phone number - required string field
  phone: {
    type: String,
    required: true
  },

  // Email address - required string field and must be unique
  email: {
    type: String,
    required: true,
    unique: true // Ensures no two users can have the same email
  },

  // Password - required string field (should be hashed before storing)
  password: {
    type: String,
    required: true
  }
});

// Export the User model based on the defined schema
// This will create a 'users' collection in MongoDB
module.exports = mongoose.model("User", userSchema);

