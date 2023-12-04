import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
   token:""
  });

const login = (token) => {

}


return (
    <UserContext.Provider
      value={{
        setIsLoggedIn,
        isLoggedIn,
        setCurrentUser,
        currentUser,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  );

}