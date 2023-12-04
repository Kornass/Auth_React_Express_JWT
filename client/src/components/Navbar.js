import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({isLoggedIn}) {
  return (
    <nav>
  <NavLink to="/">Home</NavLink>  
  <NavLink to="/sign-in">Log in</NavLink>  
  <NavLink to="/sign-up">Sign up</NavLink>
{ isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
    </nav>
  )
}

export default Navbar