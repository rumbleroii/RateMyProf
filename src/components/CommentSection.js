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
          console.log(data);
          setComments(data.professor.comments);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments()
  }, [professorId, history]);

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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {comment.anonymous ? "Anonymous" : comment.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(parseInt(comment.timestamp)).toLocaleString()}
            </Typography>
          </div>
          <Typography variant="body1" style={{ margin: "10px 0" }}>
            {comment.commentText}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton color="default" style={{ padding: "10px" }}>
                <ThumbUpIcon style={{ color: "blue" }} />
              </IconButton>
              <Typography variant="body2">{comment.upvotes}</Typography>
              <IconButton
                color="default"
                style={{ padding: "5px", marginLeft: "10px" }}
              >
                <ThumbDownIcon style={{ color: "gray" }} />
              </IconButton>
              <Typography variant="body2">{comment.downvotes}</Typography>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default CommentSection;
