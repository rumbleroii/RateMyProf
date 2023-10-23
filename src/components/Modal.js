import { createPortal } from "react-dom";
import React, { useState } from "react";
import "./Modal.css";
import {
  Button,
  DialogTitle,
  FormLabel,
  Slider,
  TextField,
  Switch,
} from "@mui/material";
import { useApi } from "../utils/api";
import { getAuth } from "firebase/auth";

const Modal = ({ open, onClose, professorId, onCommentSubmitted }) => {
  const [anonymous, setAnonymous] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [coursework, setCoursework] = useState(5);
  const [leniency, setLeniency] = useState(5);
  const [isCommentValid, setIsCommentValid] = useState(false);

  const handleSubmit = async () => {
    if (comment.length >= 30) {
      try {
        await submitComment();
        onClose();
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const submitComment = async () => {
    const auth = getAuth();
    const requestBody = {
      professorId,
      comment,
      anonymous,
      rating,
      coursework,
      leniency,
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_ID}/comments-add?id=${professorId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="overlay">
      <div className="modalpop">
        <span className="close-button" onClick={onClose}>
          X
        </span>

        <div className="slider-container">
          <DialogTitle
            style={{
              fontSize: "24px",
              fontWeight: "400",
              color: "gray",
              fontFamily: "sans-serif",
              padding: "10px 0 0 0",
            }}
          >
            Professor Kishore Ravi Kumar
          </DialogTitle>

          <div className="anonymous-switch">
            <FormLabel>Anonymous</FormLabel>
            <Switch
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />
          </div>

          <div className="sliders">
            <FormLabel>Rate the Professor</FormLabel>
            <Slider
              value={rating}
              onChange={(e, val) => setRating(val)}
              min={0}
              max={10}
              valueLabelDisplay="auto"
            ></Slider>
          </div>
          <div className="sliders">
            <FormLabel>Professor Difficulty (Exams/Assignments)</FormLabel>
            <Slider
              value={coursework}
              onChange={(e, val) => setCoursework(val)}
              min={0}
              max={10}
              valueLabelDisplay="auto"
            ></Slider>
          </div>
          <div className="sliders">
            <FormLabel>How Lenient is the Professor (Attendance)</FormLabel>
            <Slider
              value={leniency}
              onChange={(e, val) => setLeniency(val)}
              min={0}
              max={10}
              valueLabelDisplay="auto"
            ></Slider>
          </div>

          <div className="sliders">
            <TextField
              label="Comments (Minimum 30 characters)"
              multiline
              variant="outlined"
              fullWidth
              minRows={10}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setIsCommentValid(e.target.value.length >= 30);
              }}
              
            ></TextField>
          </div>

          <Button
            variant="contained"
            style={{
              width: "150px",
              float: "right",
              marginTop: "15px",
            }}
            onClick={handleSubmit}
            disabled={!isCommentValid}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
