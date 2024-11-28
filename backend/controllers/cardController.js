const Card = require("../models/Card");

// Create a new card
const createCard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCard = new Card({
      title,
      description,
      image: req.file.filename, // File name from Multer
    });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Error creating card", error });
  }
};

// Fetch all cards
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cards", error });
  }
};

module.exports = {
  createCard,
  getAllCards,
};
