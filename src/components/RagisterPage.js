import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = (e) => {
    e.preventDefault();
    
    setPassword('');
  };

  return (
    <div className='login-container'>
        <div className="login-page">
      <h1>Sign Up</h1>
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
      </form>
    </div>
    </div>
    
  );
}

export default LoginPage;
