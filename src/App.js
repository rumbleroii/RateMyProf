import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import firebaseConfig from './components/firebaseconfig';
import ProfilePage from './components/ProfilePage';
import RatePage from './components/RatePage';
console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

function App() {
  return (
    <Router>
      
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/homepage" component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path = '/professor' component = {RatePage} />
      </Switch>
      
    </Router>
  );
}

export default App;