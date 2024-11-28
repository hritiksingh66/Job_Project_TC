import React from 'react';

const Card = ({ title, description, imageUrl }) => {
  return (
    <div
      style={{
        maxWidth: '300px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{title}</h3>
        <p style={{ margin: 0, color: '#555' }}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
