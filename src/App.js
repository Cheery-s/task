// App.js
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
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
import MainLayout from "./components/Layout/MainRouteLayout";
import ErrorBoundary from "./components/commonComponents/ErrorBoundary";
import TaskList from "./components/Task/TaskList";
import { useSelector } from "react-redux";


  
function App() {
  const tasks = useSelector((state) => state.tasks.tasks); // Fetch tasks from Redux store
  const authState = useSelector((state) => state.auth);
console.log("App - authState:", authState);
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}> {/* Add a suspense fallback */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path = "/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        
         {/* Protected routes with sidebar layout */}
        <Route element = {<ProtectedRoute><ErrorBoundary><MainLayout /></ErrorBoundary></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard tasks={tasks}/>} />
          <Route path="/analytics" element={<AnalyticsDashboard tasks={tasks} />} />
          <Route path="/calendar" element={<CalendarView tasks={tasks} />} />
          <Route path="/tasks" element={<TaskList/>} />
          <Route path="/completed" element={<TaskList filter="completed"/>} />
            <Route path="/upcoming" element={<TaskList filter="upcoming"/>} />
            <Route path="/team" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Fallback route for invalid URLs  */}
          
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
