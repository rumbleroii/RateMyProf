import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RagisterPage';
import ProfessorDetailPage from './components/ProfessorRating';
import RatingPage from './components/RatingPage';

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