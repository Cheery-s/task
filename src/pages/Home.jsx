//path: src/pages/Home.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "../components/Layout/MainLayout";
// import Dashboard from "./Dashboard"
const Home = () => {

  return (
    <div className="home-container">
      <MainLayout>
      <ToastContainer />
      <div className="home-header">
        <h1 className="app-title">Welcome to the Task Management App</h1>
        <p className="app-subtitle">
          Organize your tasks efficiently and boost your productivity
        </p>
        {/* <Dashboard/> */}
      </div>
      
      </MainLayout>
      <footer className="home-footer">
        <p>© 2025 Task Management App. All rights reserved.</p>
      </footer>
      
    </div>
  );
};
export default Home;
