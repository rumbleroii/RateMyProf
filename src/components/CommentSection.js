import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CommentSection = ({ professorId }) => {
  const [comments, setComments] = useState([]);

  const history = useHistory();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const auth = getAuth();
        if (!auth) {
          history.push("/");
        }
        const response = await fetch(
          `${process.env.REACT_APP_API_ID}/comments-get?id=${professorId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    // Fetch comments when the professorId prop changes
    fetchComments();
  }, [professorId]);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      {comments.map((comment, index) => (
        <Paper
          key={comment.id}
          elevation={3}
          style={{
            background: "#f0f0f0",
            margin: "10px 0",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {comment.username}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {comment.timestamp}
            </Typography>
          </div>
          <Typography variant="body1" style={{ margin: "10px 0" }}>
            {comment.text}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <IconButton color="default">
                <ThumbUpIcon style={{ color: "blue" }} />
              </IconButton>
              <Typography variant="body2" style={{ marginRight: "5px" }}>
                {comment.likes}
              </Typography>
              Likes
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton color="default">
                <ThumbDownIcon style={{ color: "gray" }} />
              </IconButton>
              <Typography variant="body2" style={{ marginRight: "5px" }}>
                {comment.dislikes}
              </Typography>
              Dislikes
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default CommentSection;
