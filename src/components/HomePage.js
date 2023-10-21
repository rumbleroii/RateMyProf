import React, { useState, useEffect, useRef } from "react";
import ProfessorCard from "./ProfessorCard";
import Navbar from "./Navbar";
import "./HomePage.css";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function HomePage() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [professors, setProfessors] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const lastDocument = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_ID + "professor-get"}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );

        const data = await response.json();
        if (Array.isArray(data.list)) {
          const professorData = data.list;
          console.log(professorData);
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
          </Select>
        </FormControl>
      </div>

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
        <button onClick={loadMore} disabled={!lastDocument.current}>
          Load More
        </button>
      )}

      {/* Other content of your homepage */}
    </div>
  );
}

export default HomePage;
