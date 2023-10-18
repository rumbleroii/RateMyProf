import React, { useState } from "react";
import Navbar from './Navbar.js';
import './ProfilePage.css';
import defaultProfileImage from "../Assets/default-profile-image-url.png";

const branches = ["Branch 1", "Branch 2", "Branch 3", "Branch 4"]; 
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
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Branch</label>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <label>Year of Study</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {yearsOfStudy.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <input
        type="file"
        id="profileImageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      </div>
      <button className="save-button" onClick={handleSaveButtonClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
    </>
  );
};

export default ProfilePage;