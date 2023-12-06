import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {useContext, useEffect} from 'react'

import Register from './views/Register';
import Login from './views/Login';
import Private from './components/Private';
import Dashboard from './views/Dashboard';
import Navbar from './components/Navbar';

import { UserContext  } from './context/UserContext';

function App() {

const {setCurrentUser, setIsLoggedIn, isLoggedIn} = useContext(UserContext)


useEffect(()=>{
let user = JSON.parse(localStorage.getItem('user'))
if(user) {
setCurrentUser(user)
setIsLoggedIn(true)
}
},[])


  return (
    <Router>
    <Navbar />
    <div className="app">
      <Routes>
      <Route path="/" element={ !isLoggedIn ? <Login /> : <Navigate to='/dashboard' />  
      } />
        <Route path="/register" element={!isLoggedIn ?<Register />:<Navigate to='/dashboard' />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
