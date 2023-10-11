import React, { useState } from 'react';
import ProfessorCard from './ProfessorCard';
import Navbar from './Navbar';
import './HomePage.css';

function HomePage() {
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [searchTerm, setSearchTerm] = useState('');


  // Function to handle department selection
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const professorData = {
    name: 'KRK',
    department: selectedDepartment || 'Computer Science',
    email: 'johndoe@professor.nitw.ac.in',
    phoneNumber: '123-456-7890',
};
  return (
    
    <div className='homepage'>
        <Navbar />
      
      <h1 className='nit-title'>NITW</h1>
      {/* Other content of your homepage */}
      <div className='dropdown-container'>
        <label htmlFor="department">Department:</label>
        <select
          id="department"
          name="department"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="modern-dropdown"
        >
          <option value="">Select a Department</option>
          <option value="Computer Science and Engineering">Computer Science and Engineering (CSE)</option>
          <option value="Electronics and Communication Engineering">Electronics and Communication Engineering (ECE)</option>
          <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering (EEE)</option>
          <option value="Mechanical Engineering">Mechanical Engineering (MECH)</option>
          <option value="Civil Engineering">Civil Engineering (CIVIL)</option>
          <option value="Biotechnology">Biotechnology (BIOTECH)</option>
          <option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering (MME)</option>
          <option value="Chemical Engineering">Chemical Engineering (CHEM)</option>
          <option value="Physics">Physics (PHY)</option>
          <option value="Maths">Mathematics (MATH)</option>
        </select>
      </div>
      <div className='search-bar-container'>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search professor by name"
          className="search-bar"
        />
      </div>

      {selectedDepartment && (
  <h1 className="selected-department"> {selectedDepartment}</h1>
)}

      <ProfessorCard {...professorData} />
      <ProfessorCard {...professorData} />
      <ProfessorCard {...professorData} />
      <ProfessorCard {...professorData} />
      <ProfessorCard {...professorData} />
      <ProfessorCard {...professorData} />
      <ProfessorCard {...professorData} />
      

      {/* Other content of your homepage */}
    </div>
  );
}

export default HomePage;
