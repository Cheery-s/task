import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import { 
  FaTasks, 
  FaCalendarAlt, 
  FaChartBar, 
  FaUsers, 
  FaCog, 
  FaPlus,
  FaInbox,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
import TaskForm from "../Task/TaskForm";
import styles from "./css/Layout.module.css";
// import AnalyticsDashboard from "../Analytics/AnalyticsDashBoard";

const Sidebar = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const handleNewTaskClick = () => {
    setShowTaskForm(true); // Show the TaskForm modal
  };

  const closeTaskForm = () => {
    setShowTaskForm(false); // Close the TaskForm modal
  };
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <button onClick={(handleNewTaskClick)} className={styles.createButton}>
          <FaPlus className={styles.buttonIcon} />
          <span>New Task</span>
        </button>
      </div>
      <nav className={styles.sidebarNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <FaTasks className={styles.navIcon} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <FaInbox className={styles.navIcon}/>
              <span>My Tasks</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/completed" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <FaCheckCircle className={styles.navIcon} />
              <span>Completed</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/upcoming" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <FaClock className={styles.navIcon} />
              <span>Upcoming</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <FaCalendarAlt className={styles.navIcon} />
              <span>Calendar</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            
            <NavLink 
              to="/analytics" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <FaChartBar className={styles.navIcon} />
              <span>Analytics</span>
             
            </NavLink>
           
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/team" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <FaUsers className={styles.navIcon} />
              <span>Team</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <FaCog className={styles.navIcon} />
          <span>Settings</span>
        </NavLink>
      </div>

      {/* Render TaskForm as a modal */}
      {showTaskForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button onClick={closeTaskForm} className={styles.closeButton}>
              Close
            </button>
            <TaskForm />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;