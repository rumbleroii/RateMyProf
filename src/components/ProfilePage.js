import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './ProfilePage.css'

function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    // Fetch user details
    fetch('http://127.0.0.1:5001/ig-rmp/us-central1/profile-me', {
      method: 'GET',
      // Include appropriate headers, such as authorization
      // headers: {
      //   Authorization: `Bearer ${userToken}`,
      // },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });

    // Fetch user comments
    fetch('http://127.0.0.1:5001/ig-rmp/us-central1/getComments?name=Ravi Kishore Kodali', {
      method: 'GET',
      // Include appropriate headers, such as authorization
      // headers: {
      //   Authorization: `Bearer ${userToken}`,
      // },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserComments(data);
      })
      .catch((error) => {
        console.error('Error fetching user comments:', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className='user-profile'>
      <Navbar />
      <h2>User Details</h2>
      <p>Name: {userDetails.name}</p>
      <p>Email: {userDetails.email}</p>
      {/* Add more user details as needed, e.g., profile picture */}

      {/* Display user comments */}
      <h2>User Comments</h2>
      <ul>
        {userComments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
