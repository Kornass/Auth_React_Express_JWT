import React, { createContext, useState } from "react";
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
  debugger
  let decodedToken = jose.decodeJwt(token);
  let user ={
    email:decodedToken.email,
  _id:decodedToken._id,
  token:token
  }
  setCurrentUser(user)
  localStorage.setItem("user", JSON.stringify(user));
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