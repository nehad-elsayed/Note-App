import React, { useContext } from "react";
import { authContext } from "../contexts/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedAuthRoute({ children }) {
  const { isLoggedIn } = useContext(authContext);
  return <>
 {
  isLoggedIn ? <Navigate to={"/"}/>: children 
 } 
 
   </>;
}
