
// src/hooks/useProtectedRoute.jsx
// Code to protect the routes from unauthenticated users
// If the user is not authenticated, the user will be redirected to the login page
//path: src/hooks/protectedRoute.jsx =>corrected
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from './useAuth';
import LoadingSpinner from "../components/commonComponents/LoadingSpinner";

const ProtectedRoute = ({children}) =>{

     const { user, loading,error } = useAuth();
  
    // console.log("ProtectedRoute - Auth State:", { user: !!user, loading });
    if (loading){
        console.log("ProtectedRoute - Still loading, showing spinner");
        return <LoadingSpinner/>; 
    }
    
  // Handle errors in authentication
  if (error) {
    console.error("ProtectedRoute - Error in authentication:", error);
    return <div>Error: Unable to authenticate. Please try again later.</div>;
  }
    if(!user){
        console.log("ProtectedRoute - No user, redirecting to home");
        return <Navigate to="/login"/>
    }
    console.log("ProtectedRoute - User authenticated, showing protected content");
    return children;
};
export default ProtectedRoute;





















