import React, { useState, useEffect, useRef } from "react";
import ProfessorCard from "./ProfessorCard";
import Navbar from "./Navbar";
import "./HomePage.css";
import ComboBox from "./ComboBox";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function HomePage() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const lastDocument = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const auth = getAuth();
    if (!auth.currentUser) {
      history.push("/");
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_ID}/professor-get`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
            },
          }
        );

        const data = await response.json();
        if (Array.isArray(data.list)) {
          const professorData = data.list;
          lastDocument.current = professorData[professorData.length - 1].name;
          setProfessors((prevProfessors) => [
            ...prevProfessors,
            ...professorData,
          ]);
        } else {
          console.error("API response has an unexpected format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const professorsToDisplay = professors
    .filter((professorData) => {
      return (
        !selectedDepartment ||
        professorData.department?.toLowerCase() ===
          selectedDepartment.toLowerCase()
      );
    })
    .slice(startIndex, endIndex);

  const filterProfessors = () => {
    const filtered = professorsToDisplay.filter((professorData) =>
      professorData.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfessors(filtered);
  };

  // Event handler for Enter key press
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      filterProfessors();
    }
  };

  // Event handler to select a professor from the ComboBox
  const handleProfessorSelect = (professor) => {
    setSelectedProfessor(professor);
  };

  return (
    <div className="homepage">
      <Navbar />

      <h1 className="nit-title">NITW</h1>
      {/* Other content of your homepage */}
      <div className="dropdown-container">
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Select a Department:</InputLabel>

          <Select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            inputProps={{ className: "custom-select" }}
          >
            <MenuItem value="">
              <em>Select a Department</em>
            </MenuItem>
            <MenuItem value="Department of Computer Science and Engineering">
              Computer Science and Engineering (CSE)
            </MenuItem>
            <MenuItem value="Department of Electronics & communication Engineering">
              Electronics and Communication Engineering (ECE)
            </MenuItem>
            <MenuItem value="Department of Electrical Engineering">
              Electrical and Electronics Engineering (MECH)
            </MenuItem>
            <MenuItem value="Department of Mechanical Engineering">
              Mechanical Engineering (MECH)
            </MenuItem>
            <MenuItem value="Department of Civil Engineering">
              Civil Engineering (CIVIL)
            </MenuItem>
            <MenuItem value="Department of Biotechnology">
              Biotechnology (BIO)
            </MenuItem>
            <MenuItem value="Department of Chemical Engineering">
              Chemical Engineering (CHEM)
            </MenuItem>
            <MenuItem value="Department of Metallurgical & Material Engineering">
              Metallurgical & Material Engineering (MME)
            </MenuItem>
            <MenuItem value="Department of Chemistry">
              Chemistry (CHEM)
            </MenuItem>
            <MenuItem value="Department of Physics">Physics (PHY)</MenuItem>
            <MenuItem value="Department of Mathematics">
              Mathematics (MATH)
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <ComboBox
        professorsToDisplay={professorsToDisplay}
        onProfessorSelect={handleProfessorSelect}
      />

      {selectedDepartment && (
        <h1 className="selected-department"> {selectedDepartment}</h1>
      )}

      {Array.isArray(professorsToDisplay) ? (
        professorsToDisplay.map((professorData, index) => (
          <ProfessorCard
            key={index}
            id={professorData.id}
            name={
              professorData.name && professorData.name
                ? professorData.name
                : "No Name"
            }
            department={
              professorData.department && professorData.department
                ? professorData.department
                : "No Department"
            }
            email={
              professorData.email && professorData.email
                ? professorData.email
                : "No Email"
            }
            phoneNumber={
              professorData.phone_numbers &&
              professorData.phone_numbers.length > 0
                ? professorData.phone_numbers[0]
                : "No Phone Number"
            }
          />
        ))
      ) : (
        <p>No professors found or an error occurred.</p>
      )}
      {!loading && (
        <button
          onClick={loadMore}
          disabled={!lastDocument.current}
          className="load-more-button"
        >
          Load More
        </button>
      )}

      {/* Other content of your homepage */}
    </div>
  );
}

export default HomePage;
