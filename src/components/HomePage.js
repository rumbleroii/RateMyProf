import React, { useState, useEffect, useRef } from "react";
import ProfessorCard from "./ProfessorCard";
import Navbar from "./Navbar";
import "./HomePage.css";
import ComboBox from "./ComboBox";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useApi } from "../utils/api";

function HomePage() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [professors, setProfessors] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedProfessor, setSelectedProfessorName] = useState(null);

  const limit = 20;
  const lastDocument = useRef(null);

  const { data, loading} = useApi("/professor-get");
  useEffect(() => {
    try {
      if (data && Array.isArray(data?.list)) {
        const professorData = data.list;
        lastDocument.current = professorData[professorData.length - 1].name;
        setProfessors((prevProfessors) => [
          ...prevProfessors,
          ...professorData,
        ]);
      } else if (data && !Array.isArray(data?.list)) {
        console.error("API response has an unexpected format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [data, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleProfessorSelect = (selectedProfessor) => {
    if (selectedProfessor == null || selectedProfessor.label == null)
      setSelectedProfessorName(null);
    if (selectedProfessor && selectedProfessor.label) {
      const foundProfessor = professors.find(
        (professor) => professor.name === selectedProfessor.label
      );
      if (foundProfessor) {
        setSelectedProfessorName(foundProfessor);
      } else {
        console.log("Error in finding professor");
      }
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedProfessorName(null);
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

  

  return (
    <div className="homepage">
      <Navbar />

      <h1 className="nit-title">NITW</h1>
      
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
      {selectedProfessor ? (
        <ProfessorCard
          id={selectedProfessor.id}
          name={selectedProfessor.name || "No Name"}
          department={selectedProfessor.department || "No Department"}
          email={selectedProfessor.email || "No Email"}
          phoneNumber={
            selectedProfessor.phone_numbers &&
            selectedProfessor.phone_numbers.length > 0
              ? selectedProfessor.phone_numbers[0]
              : "No Phone Number"
          }
        />
      ) : Array.isArray(professorsToDisplay) ? (
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

      {!selectedProfessor && !loading && (
        <button
          onClick={loadMore}
          disabled={!lastDocument.current}
          className="load-more-button"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default HomePage;
