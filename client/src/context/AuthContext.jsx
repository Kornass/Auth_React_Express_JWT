import React, { createContext, useState } from "react";
import * as jose from "jose";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    token: "",
  });
  const [message, setMessage] = useState(null);

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    let user = {
      email: decodedToken.email,
      _id: decodedToken._id,
      token: token,
    };
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        setIsLoggedIn,
        isLoggedIn,
        setCurrentUser,
        currentUser,
        login,
        logout,
        message,
        setMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
