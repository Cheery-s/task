//path: src/pages/Home.jsx
import React from "react";
// import Login from '../components/Auth/login';
// import Signup from "../components/Auth/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "../components/Layout/MainLayout";
// import TaskForm from "../components/Task/TaskForm";
 import Dashboard1 from "../pages/Dashboard";

const Home =()=>{
    /*const[activePanel,setActivePanel]=useState("login");*/

    return (
      
       <MainLayout>
        <div className="home-container">
         
        <ToastContainer />
        
        <div className="home-header">
          <h1 className="app-title">Welcome to the Task Management App</h1>
          <p className="app-subtitle">Organize your tasks efficiently and boost your productivity</p>
        </div>
       <div className="home-content">
          <Dashboard1 />
          
        </div> 
  
        {/* <div className="auth-container">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activePanel === 'login' ? 'active' : ''}`}
              onClick={() => setActivePanel('login')}
            >
              Login
            </button>
            <button 
              className={`auth-tab ${activePanel === 'signup' ? 'active' : ''}`}
              onClick={() => setActivePanel('signup')}
            >
              Sign Up
            </button>
          </div>
  
          <div className="auth-panel">
            {activePanel === 'login' ? <Login /> : <Signup />}
          </div>
        </div> */}
  
        <footer className="home-footer">
          <p>© 2025 Task Management App. All rights reserved.</p>
        </footer>
      </div></MainLayout>
    );
};
export default Home;