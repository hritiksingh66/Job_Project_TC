import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import "./Home.css"; // Add this for the CSS file

const Home = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [editingCardId, setEditingCardId] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cards");
        const data = await response.json();
        setCards(data);
        setFilteredCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const filtered = cards.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm, cards]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await fetch(`http://localhost:5000/api/cards/${id}`, {
          method: "DELETE",
        });
        setCards((prevCards) => prevCards.filter((card) => card._id !== id));
        setFilteredCards((prevCards) =>
          prevCards.filter((card) => card._id !== id)
        );
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  };

  const handleEdit = (card) => {
    setFormData({
      title: card.title,
      description: card.description,
      image: null, // Assume user re-uploads the image if needed
    });
    setEditingCardId(card._id); // Track which card is being edited
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const method = editingCardId ? "PUT" : "POST";
      const url = editingCardId
        ? `http://localhost:5000/api/cards/${editingCardId}`
        : "http://localhost:5000/api/cards";

      const response = await fetch(url, {
        method,
        body: form,
      });
      const updatedCard = await response.json();

      if (editingCardId) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card._id === editingCardId ? updatedCard : card
          )
        );
        setFilteredCards((prevCards) =>
          prevCards.map((card) =>
            card._id === editingCardId ? updatedCard : card
          )
        );
      } else {
        setCards((prevCards) => [updatedCard, ...prevCards]);
        setFilteredCards((prevCards) => [updatedCard, ...prevCards]);
      }

      setEditingCardId(null);
      setFormData({ title: "", description: "", image: null });
    } catch (error) {
      console.error("Error uploading/updating card:", error);
    }
  };

  return (
    <div className="home-container">
      {/* Welcome Message with Animation */}
      <h1 className="animated-welcome">Welcome to the Image Gallery</h1>
      {/* Search Bar */}
      <SearchBar setSearchTerm={setSearchTerm} />

      {/* Upload Form */}
      <form className="upload-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Upload Your Image</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="form-input"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          className="form-input"
          required
        ></textarea>
        <input
          type="file"
          onChange={handleFileChange}
          className="form-input"
          required
        />
        <button type="submit" className="form-button">
          {editingCardId ? "Update Image" : "Upload Image"}
        </button>
      </form>
      <div style={{ height: "24px" }}></div>

      {/* Cards Display */}

      <div className="cards-grid">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div key={card._id} className="card">
              <img
                src={`http://localhost:5000/uploads/${card.image}`}
                alt={card.title}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <div className="card-actions">
                  <button
                    onClick={() => handleEdit(card)}
                    className="card-button edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(card._id)}
                    className="card-button delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-cards-message">
            No cards found. Try searching for something else!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
