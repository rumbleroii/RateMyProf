import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./ProfilePage.css";
import CommentCard from "./CommentCard";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [userComments, setUserComments] = useState([]);

  const commentData = {
    name: "user",
    department: "ECE",
    timestamp: "10:00",
  };

  const placeholderComments = [
    {
      username: commentData.name,
      content: `This is a placeholder comment in the Department of ${commentData.department}`,
      timestamp: commentData.timestamp,
    },
  ];

  const history = useHistory();
  useEffect(() => {
    (async () => {
      const auth = getAuth();
      if (!auth) {
        history.push("/");
      }
      const userToken = await auth.currentUser.getIdToken();
      fetch(`${process.env.REACT_APP_API_ID}/profile-me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserDetails(data.user);
          console.log(data);
        })

        .catch((error) => {
          console.error("Error fetching user details:", error);
        });

      fetch(`${process.env.REACT_APP_API_ID}/comments-get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setUserComments(data);
          } else {
            setUserComments([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching user comments:", error);
          setUserComments([]);
        });
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <h2>User Details</h2>
        <p>Name: {userDetails.name}</p>
        <p>Branch: {userDetails.department}</p>
        <p>Year: {userDetails.year}</p>
        <p>Roll No: {userDetails.rollNumber}</p>

        <h2>Your Comments: </h2>
        <CommentCard
          username={commentData.name}
          content={`This is a placeholder comment in the Department of ${commentData.department}`}
          timestamp={commentData.timestamp}
        />
        <CommentCard
          username={commentData.name}
          content={`This is a placeholder comment in the Department of ${commentData.department}`}
          timestamp={commentData.timestamp}
        />
        <CommentCard
          username={commentData.name}
          content={`This is a placeholder comment in the Department of ${commentData.department}`}
          timestamp={commentData.timestamp}
        />
        <CommentCard
          username={commentData.name}
          content={`This is a placeholder comment in the Department of ${commentData.department}`}
          timestamp={commentData.timestamp}
        />
        <CommentCard
          username={commentData.name}
          content={`This is a placeholder comment in the Department of ${commentData.department}`}
          timestamp={commentData.timestamp}
        />
      </div>
    </>
  );
}

export default UserProfile;
