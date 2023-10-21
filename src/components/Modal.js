import { createPortal } from "react-dom";
import React from "react"; // Import React just once
import "./Modal.css";
import {
  Button,
  DialogTitle,
  FormLabel,
  Slider,
  TextField,
} from "@mui/material";

const Modal = ({ open, onClose }) => {
  const getVal = (e, val) => {
    console.warn(val);
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
          <div className="sliders">
            <FormLabel>Rate the Professor</FormLabel>
            <Slider
              max={10}
              defaultValue={5}
              valueLabelDisplay="auto"
              onChange={getVal}
            ></Slider>
          </div>
          <div className="sliders">
            <FormLabel>Professor Difficulty (Exams/Assignments)</FormLabel>
            <Slider
              max={10}
              defaultValue={5}
              valueLabelDisplay="auto"
              onChange={getVal}
            ></Slider>
          </div>
          <div className="sliders">
            <FormLabel>How Lenient is the Professor (Attendance)</FormLabel>
            <Slider
              max={10}
              defaultValue={5}
              valueLabelDisplay="auto"
              onChange={getVal}
            ></Slider>
          </div>
          <div className="sliders">
            <TextField
              label="Comments"
              multiline
              variant="outlined"
              fullWidth
              minRows={10}
            ></TextField>
          </div>
          <Button
            variant="contained"
            style={{
              width: "150px",
              float: "right",
              marginTop: "15px",
            }}
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
