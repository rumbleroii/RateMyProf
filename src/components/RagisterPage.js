import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: 'YOUR_CLIENT_ID', 
      });
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      const profile = googleUser.getBasicProfile();

      
      const googleEmail = profile.getEmail();
      console.log('Signed in as: ' + googleEmail);

      
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setPassword('');
  };

  return (
    <div className='login-container'>
      <div className="login-page">
        <h1>RateMyProf</h1>
        <h2>Sign Up</h2>
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
            Sign Up
          </Link>
          <button onClick={handleGoogleSignIn} className='google-signin-button'>
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
