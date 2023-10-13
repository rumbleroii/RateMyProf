import React from 'react';
import { Link } from 'react-router-dom';
import './ProfessorCard.css'; 

function ProfessorCard({ name, department, email, phoneNumber }) {
  const fetchProfessorData = async (professorName) => {
    // Implement the logic to fetch professor data from your data source (e.g., an API)
    try {
      const response = await fetch(`https://firestore.googleapis.com/v1/projects/ig-rmp/databases/(default)/documents/professors/${encodeURIComponent(professorName)}`);
      if (!response.ok) {
        throw new Error(`Error fetching professor data: ${response.status}`);
      }
      const data = await response.json();
      return data; // Assuming the data is in JSON format
    } catch (error) {
      console.error('Error fetching professor data:', error);
      return null; // Return null in case of an error
    }
  };
  return (
    <div className="professor-card">
      <h3>{name}</h3>
      <p>Department: {department}</p>
      <p>Email: {email}</p>
      <p>Phone Number: {phoneNumber}</p>

      <Link to={`/rating/${encodeURIComponent(name)}`} className="rating-button">
        View Rating
      </Link>
      <Link to="/RatePage" className="rate-button">
        Rate
      </Link>
    </div>
  );
}

export default ProfessorCard;
