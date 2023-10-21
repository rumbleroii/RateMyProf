import React, { useState } from "react";
import Navbar from './Navbar.js';
import './ProfilePage.css';
import defaultProfileImage from "../Assets/default-profile-image-url.png";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "BIOTECH", "MME", "MATH", "PHY"]; 
const yearsOfStudy = ["1st Year", "2nd Year", "3rd Year", "4th Year"]; 


const ProfilePage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(branches[0]); 
  const [selectedYear, setSelectedYear] = useState(yearsOfStudy[0]); 
  const [profileImageURL, setProfileImageURL] = useState(defaultProfileImage);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditIconClick = () => {
    document.getElementById("profileImageInput").click();
  };

  const handleImageChange = (event) => {
    const selectedImage = URL.createObjectURL(event.target.files[0]);
    setProfileImageURL(selectedImage);
  };

  const saveProfileData = async () => {
    const updatedUserData = {
      firstName,
      lastName,
      branch: selectedBranch,
      yearOfStudy: selectedYear,
      profileImageURL,
    };

    try {
      const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        console.log('Profile data saved successfully');
      } else {
        console.error('Failed to save profile data:', response.status);
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const handleSaveButtonClick = () => {
    saveProfileData();
  };

  return (
    <>
    <Navbar />
    <div className="profile-page">
    
      <div className="profile-picture">
        <img src={profileImageURL} alt="Profile" />
        <span
            className="edit-icon"
            onClick={handleEditIconClick}>
            Edit
        </span>
      </div>

      <div className="profile-form">
        <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ marginBottom: '16px' }}
          />

        <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ marginBottom: '16px' }}
          />

        <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
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
        </FormControl>

        <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
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
          </FormControl>
        <input
        type="file"
        id="profileImageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      </div>
      <Button
          className="save-button"
          variant="contained"
          onClick={handleSaveButtonClick}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
    </div>
    </>
  );
};

export default ProfilePage;