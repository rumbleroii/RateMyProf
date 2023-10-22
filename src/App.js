import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import firebaseConfig from "./components/firebaseconfig";
import RegisterProfilePage from "./components/RegisterProfilePage";
import RatePage from "./components/RatePage";
import UserProfile from "./components/ProfilePage";
import { AuthProvider } from "./context/AuthContext";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/homepage" component={HomePage} />
        <Route path="/RegisterProfile" component={RegisterProfilePage} />
        <Route path="/professor" component={RatePage} />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
