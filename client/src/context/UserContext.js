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
  let decodedToken = jose.decodeJwt(token);
  let user ={
    email:decodedToken.email,
  _id:decodedToken._id,
  token:token
  }
  setCurrentUser(user)
  setIsLoggedIn(true)
  localStorage.setItem("user", JSON.stringify(user));
}

const logout = () => {
  localStorage.removeItem("user");
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