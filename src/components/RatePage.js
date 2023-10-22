import React, { useState } from "react";
import Navbar from "./Navbar";
import CommentSection from "./CommentSection";
import Modal from "./Modal";
import { Button, Typography, Box, Slider } from "@mui/material";
import { styled } from "@mui/system";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const professorId = searchParams.get("profId");
  const [professorData, setProfessorData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const auth = getAuth();
        if (!auth) {
          history.push("/");
        }
        const response = await fetch(
          `${process.env.REACT_APP_API_ID}professor-get?id=${professorId}`,
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
          setProfessorData(data);
          console.log("Professor Data:", data);
        } else {
          console.error("Failed to fetch professor data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfessorData();
  }, [professorId]);

  return (
    <div>
      <Navbar />
      <Container>
        <ProfessorInfoContainer>
          <Typography variant="h4">P Venkateswara Rao</Typography>
          <Typography variant="h6">Associate Professor</Typography>
          <ContactInfo>
            <Typography variant="body1">9420161800</Typography>
            <Separator>|</Separator>
            <Typography variant="body1">pvenku@nitw.ac.in</Typography>
          </ContactInfo>
          <CustomRating
            name="professor-rating"
            value={4}
            precision={0.5}
            readOnly
            disabled
          />
          <div>
            <RateButton onClick={() => setOpen(true)}>
              Rate Professor
            </RateButton>
          </div>
        </ProfessorInfoContainer>
        <SecondDiv>
          <Typography variant="h6">Breakdown</Typography>

          <div>
            <p>Overall Rating</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <DisabledSlider value={5} max={10} />
              <span style={{ marginLeft: "10px", color: "black" }}>5.0/10</span>
            </div>
          </div>
          <div>
            <p>Coursework</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <DisabledSlider value={8.7} max={10} />
              <span style={{ marginLeft: "10px", color: "black" }}>8.7/10</span>
            </div>
          </div>
          <div>
            <p>Leniency</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <DisabledSlider value={4} max={10} />
              <span style={{ marginLeft: "10px", color: "black" }}>4.0/10</span>
            </div>
          </div>
        </SecondDiv>
      </Container>

      {isOpen && (
        <div id="custom-modal-root">
          <Modal open={isOpen} onClose={() => setOpen(false)}></Modal>
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
  );
};

export default RatePage;
