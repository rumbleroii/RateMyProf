import React from 'react';

function RatingPage({ professorData }) {
  return (
    <div className="rating-page">
      <h1 className="professor-name">{professorData.name}</h1>
      <div className="professor-details">
        <p><strong>Department:</strong> {professorData.department}</p>
        <p><strong>Email:</strong> {professorData.email}</p>
        <p><strong>Phone Number:</strong> {professorData.phoneNumber}</p>
      </div>
      <div className="rating-section">
        <h2 className="rating-label">Rating:</h2>
        {/* Display the rating here */}
      </div>
    </div>
  );
}

export default RatingPage;