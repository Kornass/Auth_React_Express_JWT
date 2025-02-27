import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect } from "react";

import AuthForm from "./views/AuthForm";
import Dashboard from "./views/Dashboard";
import Navbar from "./components/Navbar";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { setCurrentUser, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={!isLoggedIn ? <AuthForm /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <AuthForm /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={!isLoggedIn ? <Navigate to="/" /> : <Dashboard />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
