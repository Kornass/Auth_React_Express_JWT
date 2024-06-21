import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const location = useLocation();

  return (
    <nav>
      {!isLoggedIn ? (
        <>
          <NavLink
            className={location.pathname?.includes("register") ? "active" : ""}
            to="/register"
          >
            Register
          </NavLink>
          <NavLink className={location.pathname === "" ? "active" : ""} to="/">
            Log in
          </NavLink>
        </>
      ) : null}

      {isLoggedIn && (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
