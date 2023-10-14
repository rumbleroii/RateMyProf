import React, { useState } from "react";
import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import "./LoginPage.css";
import { Link, useHistory } from 'react-router-dom';


const GoogleAuth = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  
  const handleLogin = (e) => {
    e.preventDefault();
    
    setPassword('');
  };
  const auth = getAuth();

  const signInWithGoogle = async () => {
    const provider = new OAuthProvider("google.com");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      if (user) {
        const email = user.email;
        if (email && email.endsWith("@student.nitw.ac.in")) {
          try {
            const idToken = await user.getIdToken();
            console.log("User ID token:", idToken);
            localStorage.setItem("userToken", idToken);
            history.push("/HomePage");
          } catch (error) {
            console.error("Error getting ID token:", error);
          }
        } else {
          console.error("Email address is not allowed for registration.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-page">
      <h1>RateMyProf</h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Link to="/HomePage" className='center-button'>
            Login
        </Link>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      {/* Add the "Sign Up" link that redirects to the registration page */}
        <button onClick={signInWithGoogle} class="google-sign-in">Sign in with Google</button>
      </div>
    </div>
  );
};

export default GoogleAuth;
