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
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useApi } from "./utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <ProtectedRoute path="/homepage" component={HomePage} />
          <ProtectedRoute
            path="/RegisterProfile"
            component={RegisterProfilePage}
          />
          <ProtectedRoute path="/professor" component={RatePage} />
          <ProtectedRoute path="/userprofile" component={UserProfile} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
