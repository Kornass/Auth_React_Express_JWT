import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
function Private() {
// Try to bring in the token from the local storage

if(localStorage.getItem("user")?.token) {
  return <Navigate to='/' />
}
return <Outlet />
}

export default Private