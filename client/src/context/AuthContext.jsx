import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { axiosAuth } from "../api/axiosJWT";
import { clearMessageAsync } from "../utils/userUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    token: "",
  });
  const [message, setMessage] = useState(null);

  const loginUser = (token) => {
    let decodedToken = jwtDecode(token);
    let user = {
      email: decodedToken.email,
      _id: decodedToken._id,
      token: token,
    };
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = async () => {
    try {
      axiosAuth.defaults.headers["Authorization"] = currentUser.token;
      let res = await axiosAuth.post("users/logout");
      if (res.data.ok) {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setCurrentUser(null);
        setMessage({
          type: "success",
          textContent: `Logged out !!`,
        });
        clearMessageAsync(setMessage);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage({ type: "error", textContent: error.response.data.message });
      }
      clearMessageAsync(setMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setIsLoggedIn,
        isLoggedIn,
        setCurrentUser,
        currentUser,
        loginUser,
        logout,
        message,
        setMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
