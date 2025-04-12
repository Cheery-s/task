// App.js
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import Dashboard2 from "./pages/Dashboard2";
import "./App.css";
import ProtectedRoute from "./hooks/useProtectedRoute";
import NotFound from "./pages/notFound";
import LoadingSpinner from "./components/commonComponents/LoadingSpinner"; // Add a loading spinner component
import Login from "./components/Auth/login";
import Signup from "./components/Auth/signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import AnalyticsDashboard from "./components/Analytics/AnalyticsDashBoard";
import CalendarView from "./components/calender/CalenderView";

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}> {/* Add a suspense fallback */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path = "/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path= "/dashboard2" element={<ProtectedRoute><Dashboard2/></ProtectedRoute>}/> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
                <Dashboard />
             
            </ProtectedRoute>
            
          }
        />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="*" element={<NotFound />} /> {/* Fallback route for invalid URLs  */}
          
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
