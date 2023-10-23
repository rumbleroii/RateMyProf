import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CommentSection from "./CommentSection";
import Modal from "./Modal";
import { Button, Typography, Slider, Paper } from "@mui/material";
import { styled } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import Rating from "@mui/material/Rating";
import './RatePage.css';
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useApi } from "../utils/api";



const CustomRating = styled(Rating)(({ theme }) => ({
  fontSize: "50px",
  color: "#FFD700",
}));

const ContactInfo = styled("div")(({ theme }) => ({
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  marginBottom: "20px",
}));

const RateButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976D2",
  color: "white",
  borderRadius: "20px",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#1565C0",
  },
  marginTop: "60px",
}));

const Separator = styled("span")(({ theme }) => ({
  margin: "0 5px",
}));

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh",
});

const ProfessorInfoContainer = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "25%",
  height: "60%",
  marginTop: "10vh",
}));

const SecondDiv = styled(Paper)(({ theme }) => ({
  background: "#white",
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "25%",
  height: "60%",
  marginTop: "10vh",
  elevation: 15,
  shadow: 4,
}));

const DisabledSlider = styled(Slider)(({ theme }) => ({
  width: "15vw",
  pointerEvents: "none",
  cursor: "default",
}));
const RatePage = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const professorId = searchParams.get("profId");
  const [professorData, setProfessorData] = useState({
    name: "",
    phone_number: "",
    role: "",
    email: "",
    coursework: 0,
    leniency: 0,
    rating: 0,
    overall: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const { data, loading, error } = useApi(`/professor-get?id=${professorId}`);
  useEffect(() => {
    if (!data) return
    const profdata = data.list[0];
    console.log(profdata.name);
    if (profdata) {
      setProfessorData({
        name: profdata.name,
        phone_number: "000",
        role: profdata.role,
        email: profdata.email,
        leniency: profdata.leniency ?? 0,
        coursework: profdata.coursework ?? 0,
        rating: profdata.rating ?? 0,
        overall:
          ((profdata.rating ?? 0) +
            (profdata.leniency ?? 0) +
            (profdata.coursework ?? 0)) /
          6,
      });
      setIsLoading(false);
    }
  }, [professorId, data ]);

  return (
    <>
    <Navbar />
    <div className={`container ${isMobile ? 'mobile-container' : 'standard-container'}`}>
      
      <Container className="content-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ProfessorInfoContainer className="professor-info-container">
            <Typography variant="h4">{professorData.name}</Typography>
            <Typography variant="h6">{professorData.role}</Typography>
            <ContactInfo>
              <Typography variant="body1">9420161800</Typography>
              <Separator>|</Separator>
              <Typography variant="body1">{professorData.email}</Typography>
            </ContactInfo>
            <CustomRating
              name="professor-rating"
              value={professorData.overall}
              precision={0.5}
              readOnly
              disabled
            />
            <div>
              <RateButton className="custom-rate-button" onClick={() => setOpen(true)}>
                Rate Professor
              </RateButton>
            </div>
          </ProfessorInfoContainer>
        )}

        <SecondDiv className="second-div">
          <Typography variant="h6">Breakdown</Typography>

          <div>
            <p>Overall Rating</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <DisabledSlider value={professorData.rating} max={10} />
              <span style={{ marginLeft: "10px", color: "black" }}>
                {professorData.rating.toFixed(1)}/10
              </span>
            </div>
          </div>
          <div>
            <p>Coursework</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <DisabledSlider value={professorData.coursework} max={10} />
              <span style={{ marginLeft: "10px", color: "black" }}>
                {professorData.coursework.toFixed(1)}/10
              </span>
            </div>
          </div>
          <div>
            <p>Leniency</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <DisabledSlider value={professorData.leniency} max={10} />
              <span style={{ marginLeft: "10px", color: "black" }}>
                {professorData.leniency.toFixed(1)}/10
              </span>
            </div>
          </div>
        </SecondDiv>
      </Container>

      {isOpen && (
        <div id="custom-modal-root" className="custom-modal-root">
          <div className="custom-modal-content">
          <Modal
            open={isOpen}
            onClose={() => setOpen(false)}
            professorId={professorId}
          ></Modal>
          </div>
        </div>
      )}
      <div
        style={{
          width: "80%",
          height: "3px",
          margin: "0 auto",
          backgroundColor: "black",
        }}
      ></div>
      <CommentSection professorId={professorId} />
    </div>
    </>
  );
};

export default RatePage;
