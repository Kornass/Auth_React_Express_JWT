import {useContext} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
function Navbar() {

const {isLoggedIn} = useContext(UserContext)

  return (
    <nav>
  <NavLink to="/">Home</NavLink>  
  {!isLoggedIn ? 
   <><NavLink to="/register">Register</NavLink>  
  <NavLink to="/log-in">Log in</NavLink></> : null }


{ isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
    </nav>
  )
}

export default Navbar