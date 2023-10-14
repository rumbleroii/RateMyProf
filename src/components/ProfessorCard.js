import React from 'react';
import { Link } from 'react-router-dom';
import './ProfessorCard.css'; 

function ProfessorCard({ name, department, email, phoneNumber }) {
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
