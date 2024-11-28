const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cardRoutes = require("./routes/cardRoutes");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use('/api/cards', cardRoutes); // Card routes

// MongoDB connection & start server
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Mongo URI:", process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Start server after DB connection is successful
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });