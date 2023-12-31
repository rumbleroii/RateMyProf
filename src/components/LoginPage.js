import React from "react";
import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

const GoogleAuth = () => {
  const history = useHistory();

  const signInWithGoogle = async () => {
    const auth = getAuth();

    try {
      const provider = new OAuthProvider("google.com");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const email = user.email;
        if (email && email.endsWith("@student.nitw.ac.in")) {
          try {
            const idToken = await user.getIdToken();
            const response = await fetch(
              `${process.env.REACT_APP_API_ID}/profile-me`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${idToken}`,
                },
              }
            );
            if (response.ok) {
              const data = await response.json();
              history.push("/HomePage");
            } else {
              history.push("/registerprofile");
            }
          } catch (error) {
            console.error("Error getting ID token:", error);
          }
        } else {
          console.error("Email address is not allowed for registration.");
        }
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="blue-background">
        <h1 className="rate-my-prof-title">
          {" "}
          RateMyProf <br />
          NITW{" "}
          <p>
            Empowering students at NITW to have their voices heard, <br />{" "}
            RateMyProf NITW allows you to rate and review your professors,{" "}
            <br />
            fostering an environment of transparency. <br /> <br /> Built by
            anonymous students from NITW.
          </p>
        </h1>
      </div>

      <div className="google-button-container">
        <button onClick={signInWithGoogle} className="google-sign-in">
          Sign in with Google
        </button>
        <div className="student-mail-para">
          <p>Use your student mail only</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
