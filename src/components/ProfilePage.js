import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./ProfilePage.css";
import CommentCard from "./CommentCard";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useApi } from "../utils/api";

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
  const { data, loading } = useApi("/profile-me");
  const { data: commentsData, loading: commentsLoading } =
    useApi("/comments-get");
  useEffect(() => {
    (async () => {
      if (data) {
        setUserDetails(data.user);
        console.log(data);
      }
      if (commentsData) {
        if (Array.isArray(commentsData)) {
          setUserComments(commentsData);
        } else {
          setUserComments([]);
        }
      }
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
