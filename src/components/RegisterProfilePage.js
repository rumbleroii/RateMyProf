import React, { useState } from "react";
import Navbar from "./Navbar.js";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const branches = ["Branch 1", "Branch 2", "Branch 3", "Branch 4"];
const yearsOfStudy = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const CustomTextField = styled(TextField)({
  width: "100%",
  marginBottom: "30px",
});

const CustomFormControl = styled(FormControl)({
  width: "100%",
  marginBottom: "30px",
});

const CenteredContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
});

const FormPaper = styled(Paper)({
  padding: "20px",
  background: "f0f0f0",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "16px",
});

const RegisterProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [selectedYear, setSelectedYear] = useState(yearsOfStudy[0]);

  const saveProfileData = async () => {
    const updatedUserData = {
      firstName,
      lastName,
      branch: selectedBranch,
      yearOfStudy: selectedYear,
    };

    try {
      const response = await fetch("API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        console.log("Profile data saved successfully");
      } else {
        console.error("Failed to save profile data:", response.status);
      }
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleSaveButtonClick = () => {
    saveProfileData();
  };

  return (
    <>
      <Navbar />
      <CenteredContainer>
        <FormPaper>
          <div className="profile-form" style={{ marginTop: "50px" }}>
            <CustomTextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <CustomTextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <CustomFormControl variant="outlined">
              <InputLabel>Branch</InputLabel>
              <Select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                label="Branch"
              >
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            </CustomFormControl>

            <CustomFormControl variant="outlined">
              <InputLabel>Year of Study</InputLabel>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                label="Year of Study"
              >
                {yearsOfStudy.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </CustomFormControl>

            <ButtonContainer>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100px" }}
                onClick={handleSaveButtonClick}
              >
                Save
              </Button>
            </ButtonContainer>
          </div>
        </FormPaper>
      </CenteredContainer>
    </>
  );
};

export default RegisterProfilePage;
