import React from "react";

const SearchBar = ({ setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        padding: "8px",
      }}
    >
      <input
        type="text"
        placeholder="Search for images, places, or anything..."
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "14px 20px",
          fontSize: "1.1rem",
          borderRadius: "50px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          outline: "none",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
          fontWeight: "500",
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.2)";
          e.target.style.borderColor = "#4A90E2";
          e.target.style.transform = "scale(1.05)";
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
          e.target.style.borderColor = "#ddd";
          e.target.style.transform = "scale(1)";
        }}
      />
      <button
        style={{
          position: "absolute",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "transparent",
          color: "#4A90E2",
          fontSize: "1.4rem",
          cursor: "pointer",
          transition: "color 0.3s ease",
        }}
        onClick={() => alert("Search icon clicked!")}
        onMouseEnter={(e) => (e.target.style.color = "#357ABD")}
        onMouseLeave={(e) => (e.target.style.color = "#4A90E2")}
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;