import React from "react";
import "./CommentCard.css";
import { Button } from "@mui/material";

function CommentCard({
  username,
  content,
  timestamp,
  onDelete, 
}) {
  return (
    <div className="Comment-card">
      <h5>{username}</h5>
      <p> {content}</p>
      <p> {timestamp}</p>

      <Button
        variant="contained"
        className="delete-button"
        onClick={onDelete} 
      >
        Delete
      </Button>
    </div>
  );
}

export default CommentCard;
