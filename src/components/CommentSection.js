import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "User123",
      text: "This is an example comment text.",
      likes: 10,
      dislikes: 3,
      timestamp: "3 hours ago",
    },
    {
      id: 1,
      username: "User123",
      text: "This is an example comment text.",
      likes: 10,
      dislikes: 3,
      timestamp: "3 hours ago",
    },
  ]);

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
