import React, { useState } from "react";
import Navbar from './Navbar.js';
import './ProfilePage.css';
import defaultProfileImage from "../Assets/default-profile-image-url.png";

const branches = ["Branch 1", "Branch 2", "Branch 3", "Branch 4"]; // Replace with your branch options
const yearsOfStudy = ["1st Year", "2nd Year", "3rd Year", "4th Year"]; // Replace with your year of study options

const ProfilePage = () => {
  // Define state variables for first name, last name, selected branch, and selected year
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(branches[0]); // Default to the first branch
  const [selectedYear, setSelectedYear] = useState(yearsOfStudy[0]); // Default to the first year
  const [profileImageURL, setProfileImageURL] = useState(defaultProfileImage);

  const handleEditIconClick = () => {
    // Trigger the click event of the file input
    document.getElementById("profileImageInput").click();
  };

  const handleImageChange = (event) => {
    // Handle the image selection and update the state
    const selectedImage = URL.createObjectURL(event.target.files[0]);
    setProfileImageURL(selectedImage);
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
    </div>
    </>
  );
};

export default ProfilePage;