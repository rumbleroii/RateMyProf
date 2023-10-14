import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RagisterPage';
import ProfessorDetailPage from './components/ProfessorRating';
import RatingPage from './components/RatingPage';
import RatePage from './components/RatePage';
import firebaseConfig from './components/firebaseconfig';

console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

function App() {
  return (
    <Router>
      
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/homepage" component={HomePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/professor/:id" component={ProfessorDetailPage} />
        <Route path="/rate/:id" component={RatingPage} />
      </Switch>
      
    </Router>
  );
}

export default App;