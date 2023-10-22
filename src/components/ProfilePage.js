import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./ProfilePage.css";
import CommentCard from "./CommentCard";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useApi } from "../utils/api";

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const deleteComment = async (comment) => {
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
            professorId: comment.professorId,
            commentId: comment.id,
          }),
        }
      );
      if (response.ok) {
        fetchUserComments(userToken);
      } else {
        console.log({
          professorId: comment.professorId,
          commentId: comment.id,
        });
        console.error("Failed to delete the comment");
      }
    } catch (error) {
      console.error("Error deleting the comment:", error);
    }
  };

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
        console.log(data);
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

  const { data } = useApi("/profile-me?comments=true");
  useEffect(() => {
    if (data) {
      setUserDetails(data.user);
      setUserComments(data.comments);
      console.log({ data });
      setLoading(false);
    }
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
              onDelete={() => deleteComment(comment)}
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
