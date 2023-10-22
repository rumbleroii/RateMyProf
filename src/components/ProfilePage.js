import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./ProfilePage.css";
import CommentCard from "./CommentCard";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const deleteComment = async (commentId) => {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        history.push("/");
      }
      const userToken = await auth.currentUser.getIdToken();

      const response = await fetch(
        `${process.env.REACT_APP_API_ID}/comments-delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            professorId: userDetails.professorId,
            commentId: commentId,
          }),
        }
      );
      if (response.ok) {
        fetchUserComments(userToken);
      } else {
        console.error("Failed to delete the comment");
      }
    } catch (error) {
      console.error("Error deleting the comment:", error);
    }
  };

  // Function to fetch user comments
  const fetchUserComments = async (userToken) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ID}/profile-me?comments=true`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserComments(data.comments);
        setLoading(false);
      } else {
        console.error("Error fetching user comments");
        setUserComments([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user comments:", error);
      setUserComments([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const auth = getAuth();
      if (!auth.currentUser) {
        history.push("/");
      }
      try {
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
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });

        fetchUserComments(userToken);
      } catch (error) {
        console.error("Error getting user token:", error);
        setLoading(false);
      }
    })();
  }, [history]);

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <h2>User Details</h2>
        {loading ? (
          <p>Loading user details...</p>
        ) : userDetails ? (
          <>
            <p>Name: {userDetails.name}</p>
            <p>Branch: {userDetails.department}</p>
            <p>Year: {userDetails.year}</p>
            <p>Roll No: {userDetails.rollNumber}</p>
          </>
        ) : (
          <p>No user details available.</p>
        )}

        <h2>Your Comments: </h2>
        {loading ? (
          <p>Loading user comments...</p>
        ) : userComments.length > 0 ? (
          userComments.map((comment, index) => (
            <CommentCard
              key={index}
              username={userDetails.name}
              content={comment.commentText}
              timestamp={new Date(parseInt(comment.timestamp)).toLocaleString()}
              onDelete={() => deleteComment(comment.commentId)}
            />
          ))
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </>
  );
}

export default UserProfile;
