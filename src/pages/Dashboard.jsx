//src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import { useSelector } from "react-redux";
import TaskList from "../components/Task/TaskList";
import TaskForm from "../components/Task/TaskForm";
import { ToastContainer, toast } from "react-toastify";
import Button from "../components/commonComponents/Button";
import "react-toastify/dist/ReactToastify.css";
 import LoadingSpinner from "../components/commonComponents/LoadingSpinner"; // Add a loading spinner component
import CalendarView from "../components/calender/CalenderView";
import AnalyticsDashboard from "../components/Analytics/AnalyticsDashBoard";
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle, FaCalendarAlt, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import  styles from"./css/Dashboard.module.css";




const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
   const [loading, setLoading] = useState(true);
  //  const [user,setUser] = useState(null);
    const tasks = useSelector((state) => state.tasks.tasks); // Fetch tasks from Redux store
  const authUser = useSelector((state) => state.auth.user);
 
  // Determine the active tab based on the current route
  const pathname = location.pathname;
  // let initialTab = "tasks";

  // Determine the active tab based on the current route
  const [activeTab, setActiveTab] = useState(() => {
    if (pathname === "/dashboard") return "tasks"; // Default to tasks for /dashboard
    if (pathname === "/calendar") return "calendar";
    if (pathname === "/analytics") return "analytics";
    if (pathname === "/completed") return "completed";
    if (pathname === "/upcoming") return "upcoming";
    return "tasks";
  });// Default to tasks view");
  useEffect(() => {
    if (pathname === "/dashboard") setActiveTab("tasks");
    else if (pathname === "/calendar") setActiveTab("calendar");
    else if (pathname === "/analytics") setActiveTab("analytics");
    else if (pathname === "/completed") setActiveTab("completed");
    else if (pathname === "/upcoming") setActiveTab("upcoming");
  }, [pathname]);
  // if (pathname === "/calendar") initialTab = "calendar";
  // else if (pathname === "/analytics") initialTab = "analytics";
  // else if (pathname === "/completed") initialTab = "completed";
  // else if (pathname === "/upcoming") initialTab = "upcoming";
 
  
  
  console.log("Dashboard rendering, loading state:", loading);
  // Calculate task statistics
  // const taskStats = {
  //   total: tasks?.length || 0,
  //   completed: tasks?.filter(task => task.completed).length || 0,
  //   upcoming: tasks?.filter(task => !task.completed && new Date(task.due_date) > new Date()).length || 0,
  //   overdue: tasks?.filter(task => !task.completed && new Date(task.due_date) < new Date()).length || 0,
  // };
  // Task statistics
  const taskStats = {
    total: tasks?.length || 0,
    completed: tasks?.filter((task) => task.completed).length || 0,
    upcoming: tasks?.filter((task) => !task.completed && new Date(task.due_date) > new Date()).length || 0,
    overdue: tasks?.filter((task) => !task.completed && new Date(task.due_date) < new Date()).length || 0,
  };
  // const taskStats = {
  //   total: tasks?.length || 0,
  //   completed: tasks?.filter(task => task.status === "completed").length || 0,
  //   upcoming: tasks?.filter(task => task.status === "not-started").length || 0,
  //   overdue: tasks?.filter(task => 
  //     task.status !== "completed" && 
  //     new Date(task.dueDate) < new Date()
  //   ).length || 0
  // };
  
  //  check authetication on component mount
  useEffect(() => {
  //   const checkAuth = async () => {
  //     const {
  //       data: { user }
  //     } = await supabase.auth.getUser();
  //     if (!user) {
  //       toast.error("You must be logged in to access the dashboard", {
  //         position: "top-center",
  //       });
  //       // setTimeout(console.error("User not Authenticated"), 1000);
  //       navigate("/"); // Redirect to home if not autheticated
  //     } else {
  //       setUser(user)
  //        setLoading(false);
  //     }
  //   };
  //   checkAuth();
  //   return () => {
  //     // Cleanup function to prevent memory leaks
  //     setUser(null);
  //     setLoading(true);
  //   };
  // }, [navigate]);

  console.log("Dashboard component mounted");
    // Since ProtectedRoute already handles auth, we can simplify this
    // setUser(authUser);
    setLoading(false); // Ensure loading is set to false after setting the user
    console.log("Dashboard - authUser from Redux:", authUser);
  }, [authUser, navigate]);
  //[authUser, navigate]);

  const handleLogout = async () => {
    try{
    await supabase.auth.signOut();

    toast.success("Logged out successfully", { position: "top-center" });
    navigate("/");
    }catch (error) {
      toast.error("Failed to log out. Please try again.", { position: "top-center" });
      console.error("Logout error:", error);
    }
  };
  if (loading){
    console.log("Dashboard - Loading spinner shown");
     return <LoadingSpinner/>//show loading spinner
    
   }
   console.log("Dashboard - Rendering content");
  return (
    <div className={styles.dashboardContainer}>
        <ToastContainer/>
        <div className={styles.dashboardHeader}>
          <div className={styles.dashboardTitle}>
            <h1>AI Task Manager</h1>
            <p className={styles.welcomeText}>Welcome,{authUser?.email.split("@")[0] || "User"}</p>
          </div>

          <Button onClick={handleLogout} className={styles.logoutButton}>
          <FaSignOutAlt className={styles.logoutIcon} />LogOut</Button>
        </div>
      
        <div className={styles.statsGrid}>
        <div className={styles.statsCard}>
          <div className={styles.statsIconContainer}>
            <FaTasks  className={styles.statsIcon}  />
          </div>
          <div className={styles.statsContent}>
            <h3 className={styles.statsValue}>{taskStats.total}</h3>
            <p className={styles.statsLabel}>Total Tasks</p>
          </div>
        </div>

        <div className={styles.statsCard}>
          <div className={`${styles.statsIconContainer} ${styles.completedIcon}`}>
            <FaCheckCircle className={styles.statsIcon} />
          </div>
          <div className={styles.statsContent}>
            <h3 className={styles.statsValue}>{taskStats.completed}</h3>
            <p className={styles.statsLabel}>Completed</p>
          </div>
        </div>

        <div className={styles.statsCard}>
          <div className={`${styles.statsIconContainer} ${styles.upcomingIcon}`}>
            <FaClock className={styles.statsIcon} />
          </div>
          <div className={styles.statsContent}>
            <h3 className={styles.statsValue}>{taskStats.upcoming}</h3>
            <p className={styles.statsLabel}>Upcoming</p>
          </div>
        </div>

        <div className={styles.statsCard}>
          <div className={`${styles.statsIconContainer} ${styles.overdueIcon}`}>
            <FaExclamationTriangle className={styles.statsIcon} />
          </div>
          <div className={styles.statsContent}>
            <h3 className={styles.statsValue}>{taskStats.overdue}</h3>
            <p  className={styles.statsLabel}>Overdue</p>
          </div>
        </div>
      </div>


      <div className={styles.dashboardTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'tasks' ? styles.active : ''}`}
          onClick={() => setActiveTab('tasks')}
        > <FaTasks className={styles.tabIcon} />
          Tasks
        </button>
        <button 
           className={`${styles.tabButton} ${activeTab === 'calendar' ? styles.active : ''}`}
          onClick={() => setActiveTab('calendar')}
        ><FaCalendarAlt className={styles.tabIcon} />
          Calendar
          
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'analytics' ? styles.active : ''}`}
          onClick={() => setActiveTab('analytics')}
        ><FaChartBar className={styles.tabIcon} />
          Analytics
        </button>
      </div>

      <div className={styles.dashboardContent}>
        {(activeTab === "/dashboard" || activeTab === 'tasks') && (
          <div className={styles.tasksContainer}>
            <div className={styles.taskFormSection}>
            <h2 className={styles.sectionTitle}>Add New Task</h2>
            <TaskForm />
            </div>
            <div className={styles.taskListSection}>
            <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Tasks</h2>
            {taskStats.total > 0 && (
              <span className={styles.taskCount}>{taskStats.total} tasks</span>
            )}
              </div>
            <TaskList filter="all"/>
            </div>
            </div>
        )}
        {activeTab === "/completed" && (
          <div className={styles.tasksContainer}>
            <div className={styles.taskListSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Completed Tasks</h2>
              </div>
              <TaskList filter="completed" />
            </div>
          </div>
        )}
        {activeTab === "/upcoming" && (
          <div className={styles.tasksContainer}>
            <div className={styles.taskListSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Upcoming Tasks</h2>
              </div>
              <TaskList filter="upcoming" />
            </div>
          </div>
        )}
        
        {activeTab === 'calendar' && (
          <div className={styles.calendarContainer}>
              <h2 className={styles.sectionTitle}>Calendar View</h2>
          <CalendarView tasks={tasks} />
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className={styles.analyticsContainer}>
            <h2 className={styles.sectionTitle}>Task Analytics</h2>
          <AnalyticsDashboard tasks={tasks} />
          </div>
        )}
      </div>
      
      
    </div>
  );
};
export default Dashboard;