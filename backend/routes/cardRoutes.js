const express = require("express");
const multer = require("multer");
const { createCard, getAllCards } = require("../controllers/cardController");

const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Directory for storing files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file names
  },
});

const upload = multer({ storage });

// POST: Create a new card
router.post("/", upload.single("image"), createCard);

// GET: Fetch all cards
router.get("/", getAllCards);

module.exports = router;
