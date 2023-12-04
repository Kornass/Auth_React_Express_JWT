import React, { createContext, useState, useEffect } from "react";
import * as jose from 'jose'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
   token:""
  });

const login = (token) => {
  let decodedToken = jose.decodeJwt(token);
  setCurrentUser({
    email:decodedToken.email,
  _id:decodedToken._id,
  token:token
  })
  localStorage.setItem("token", JSON.stringify(token));
  setIsLoggedIn(true)
}

const logout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
};


return (
    <UserContext.Provider
      value={{
        setIsLoggedIn,
        isLoggedIn,
        setCurrentUser,
        currentUser,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );

}