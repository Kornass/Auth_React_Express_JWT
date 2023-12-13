import {useContext} from 'react'
import { NavLink } from "react-router-dom";
import { UserContext } from '../context/UserContext';

function Navbar() {

const {isLoggedIn, logout} = useContext(UserContext)

  return (
    <nav>
{!isLoggedIn ? 
   <>
   <NavLink to="/register">Register</NavLink>  
  <NavLink to="/">Log in</NavLink>
  </> : null }
  
{ isLoggedIn && <>
<NavLink to="/dashboard">Dashboard</NavLink>
<button onClick={logout}>Log out</button>
</>
}
    </nav>
  )
}

export default Navbar