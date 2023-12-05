import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useContext, useEffect} from 'react'

import Home from './views/Home';
import SignIn from './views/Register';
import SignUp from './views/Login';
import Private from './components/Private';
import Dashboard from './views/Dashboard';
import Navbar from './components/Navbar';

import { UserContext  } from './context/UserContext';

function App() {

const {setCurrentUser, setIsLoggedIn} = useContext(UserContext)

//???????
// useEffect(()=>{
// let user = localStorage.getItem('user')
// if(user) {
// setCurrentUser(user)
// setIsLoggedIn(true)
// }
// },[])

  return (
    <Router>
    <Navbar />
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/log-in" element={<SignUp />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
