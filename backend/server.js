const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cardRoutes = require("./routes/cardRoutes");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//MiddleWare
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use('/api/cards', cardRoutes); // Card routes

// MongoDB connection & start server
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Mongo URI:", process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Start server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
