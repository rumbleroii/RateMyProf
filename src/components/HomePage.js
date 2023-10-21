import React, { useState, useEffect, useRef } from 'react';
import ProfessorCard from './ProfessorCard';
import Navbar from './Navbar';
import './HomePage.css';



import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';



function HomePage() {
  
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [professors, setProfessors] = useState('');
    const [filteredProfessors, setFilteredProfessors] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 20;
    const lastDocument = useRef(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.REACT_APP_API_ID}`,
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
  
          let data = await response.json();
          if (Array.isArray(data.list)) {
            const professorData = data.list;
            lastDocument.current = professorData[professorData.length - 1].name;
            console.log(professorData)
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
    const filteredProfessors = professors.filter((professorData) =>{
      const professorName = professorData.name?.stringValue || ''; 
      return professorName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    setProfessors(filteredProfessors);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filterProfessors = (searchTerm) => {
    const filteredProfessors = professors.filter((professorData) => {
      const professorName = professorData.name?.stringValue || '';
      return professorName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredProfessors(filteredProfessors);
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
      <FormControl variant="outlined" fullWidth>
          <InputLabel>Select a Department:</InputLabel>
          
          <Select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            inputProps={{ className: 'custom-select' }}
          >
            <MenuItem value="">
              <em>Select a Department</em>
            </MenuItem>
            <MenuItem value="Computer Science and Engineering">
              Computer Science and Engineering (CSE)
            </MenuItem>
            <MenuItem value="Electronics and Communication Engineering">
              Electronics and Communication Engineering (ECE)
            </MenuItem>
            <MenuItem value="Electrical and Electronics Engineering">
              Electrical and Electronics Engineering (EEE)
            </MenuItem>
            <MenuItem value="Mechanical Engineering">
              Mechanical Engineering (MECH)
            </MenuItem>
            <MenuItem value="Civil Engineering">
              Civil Engineering (CIVIL)
            </MenuItem>
            <MenuItem value="Biotechnology">
              Biotechnology (BIO)
            </MenuItem>
            <MenuItem value="Metallurgical and Materials Engineering">
            Metallurgical and Materials Engineering (MME)
            </MenuItem>
            <MenuItem value="Chemical Engineering">
              Chemical Engineering (CHEM)
            </MenuItem>
            <MenuItem value="Maths">
              Maths (MATH)
            </MenuItem>
            <MenuItem value="Physics">
              Physics (PHY)
            </MenuItem>
          </Select>
        </FormControl>
        
      </div>
      <div className='search-bar-container'>
      <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="search"></InputLabel>
          <TextField
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => {
              const newSearchTerm = e.target.value;
              setSearchTerm(newSearchTerm);
              filterProfessors(newSearchTerm);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Search professor by name"
          />
        </FormControl>
        
      </div>

      {selectedDepartment && (
  <h1 className="selected-department"> {selectedDepartment}</h1>
)}
      
      {Array.isArray(professors) ? (
  professors.map((professorData, index) => (
    <ProfessorCard
    key={index}
    name={professorData.name && professorData.name ? professorData.name: 'No Name'}
    department={professorData.department && professorData.department ? professorData.department : 'No Department'}
    email={professorData.email && professorData.email ? professorData.email : 'No Email'}
    phoneNumber={(professorData.phone_numbers && professorData.phone_numbers.values[0] && professorData.phone_numbers.values[0]) ? professorData.phone_numbers.values[0].stringValue : 'No Phone Number'}
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
