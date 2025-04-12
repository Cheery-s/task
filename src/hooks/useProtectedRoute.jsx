
// src/hooks/useProtectedRoute.jsx
// Code to protect the routes from unauthenticated users
// If the user is not authenticated, the user will be redirected to the login page
//path: src/hooks/protectedRoute.jsx =>corrected
import { Navigate } from "react-router-dom";
import { useAuth } from './useAuth'
import LoadingSpinner from "../components/commonComponents/LoadingSpinner";

const ProtectedRoute = ({children}) =>{
    const { user, loading } = useAuth();
    if (loading){
        console.log('ProtectedRoute showing loader');
        return <LoadingSpinner/>; 
    }
    if(!user){
        console.log('ProtectedRoute redirecting');
        return <Navigate to="/"/>
    }
    console.log('ProtectedRoute showing protected content');
    return children;
};
export default ProtectedRoute;





















