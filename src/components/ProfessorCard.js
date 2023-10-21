import React from 'react';
import { Link } from 'react-router-dom';
import './ProfessorCard.css'; 
import { Button } from '@mui/material';

function ProfessorCard({ name, department, email, phoneNumber }) {
  return (
    <div className="professor-card">
      <h3>{name}</h3>
      <p>Department: {department}</p>
      <p>Email: {email}</p>
      <p>Phone Number: {phoneNumber}</p>

      <Button
        variant="contained"
        component={Link}
        to="/RatePage"
        className="rate-button"
      >
        Rate
      </Button>
    </div>
  );
}

export default ProfessorCard;
