import React, { useState, useEffect, useRef } from 'react';
import ProfessorCard from './ProfessorCard';
import Navbar from './Navbar';
import './HomePage.css';

function HomePage() {
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [professors, setProfessors] = useState('');
    const [page, setPage] = useState(1);
    const limit = 20;
    const lastDocument = useRef(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.REACT_APP_API_ID}/getProfessors`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
              },
            }
          );
  
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
  
          const data = await response.json();
  
          if (data.documents) {
            const professorData = data.documents.map((doc) => doc.fields);
            lastDocument.current = data.documents[data.documents.length - 1].name;
            setProfessors((prevProfessors) => [...prevProfessors, ...professorData]);
          } else {
            console.error('API response has an unexpected format:', data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [page]); 
    console.log(process.env.REACT_APP_API_ID);
    const loadMore = () => {
      setPage((prevPage) => prevPage + 1);
    };
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };
  const handleSearch = () => {
    const filteredProfessors = professors.filter((professorData) =>
      professorData.name.stringValue.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProfessors(filteredProfessors);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  /*
  const professorData = {
    name: 'KRK',
    department: selectedDepartment || 'Computer Science',
    email: 'johndoe@professor.nitw.ac.in',
    phoneNumber: '123-456-7890',
}; */
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
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} 
          placeholder="Search professor by name"
          className="search-bar"
        />
        
      </div>

      {selectedDepartment && (
  <h1 className="selected-department"> {selectedDepartment}</h1>
)}
      
      {Array.isArray(professors) ? (
  professors.map((professorData, index) => (
    <ProfessorCard
    key={index}
    name={professorData.name.stringValue || 'No Name'}
    department={professorData.department.stringValue || 'No Department'}
    email={professorData.email.stringValue || 'No Email'}
    phoneNumber={professorData.phone_numbers.arrayValue.values[0].stringValue || 'No Phone Number'}
  />
    
  ))
) : (
  <p>No professors found or an error occurred.</p>
)}
      {!loading && (
          <button onClick={loadMore} disabled={!lastDocument.current}>
            Load More
          </button>
        )}

      {/* Other content of your homepage */}
    </div>
  );
}

export default HomePage;
