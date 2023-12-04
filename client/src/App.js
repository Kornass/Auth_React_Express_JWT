import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Private from './components/Private';
import Dashboard from './views/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
    <Navbar />
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
