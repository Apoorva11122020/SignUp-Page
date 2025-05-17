
// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
dotenv.config(); // Load environment variables from .env file

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB using credentials from environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import User model (Mongoose schema)
const User = require("./models/User");

// ----------------- SIGNUP ROUTE -----------------
app.post("/signup", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    // Check if the user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Account already exists" });

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // Save the new user to MongoDB
    await user.save();

    // Send a success response
    res.status(201).json({ message: "Signed up successfully!" });
  } catch (err) {
    // Handle server or DB errors
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------- LOGIN ROUTE -----------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found, send error
    if (!user)
      return res.status(404).json({ message: "User does not exist" });

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match, send unauthorized response
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // If successful, send success response
    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------- START SERVER -----------------
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
