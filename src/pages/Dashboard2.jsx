import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle } from "react-icons/fa";
import styles from "./css/Dashboard.module.css";

const Dashboard = () => {
  // Sample data - in a real app, this would come from your Redux store
  const taskStats = {
    total: 24,
    completed: 12,
    upcoming: 8,
    overdue: 4
  };

  const recentTasks = [
    { id: 1, title: "Implement authentication", status: "completed", date: "2023-05-15" },
    { id: 2, title: "Create dashboard UI", status: "in-progress", date: "2023-05-16" },
    { id: 3, title: "Integrate Redux Saga", status: "not-started", date: "2023-05-17" },
    { id: 4, title: "Connect to Supabase", status: "completed", date: "2023-05-14" },
    { id: 5, title: "Implement task creation", status: "in-progress", date: "2023-05-16" }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return styles.statusCompleted;
      case "in-progress":
        return styles.statusInProgress;
      case "not-started":
        return styles.statusNotStarted;
      default:
        return "";
    }
  };

  return (
    <MainLayout>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.welcomeText}>Welcome back to your AI Task Manager!</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statsCard}>
          <div className={styles.statsIconContainer}>
            <FaTasks className={styles.statsIcon} />
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
            <p className={styles.statsLabel}>Overdue</p>
          </div>
        </div>
      </div>

      <div className={styles.recentTasksContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Tasks</h2>
          <button className={styles.viewAllButton}>View All</button>
        </div>

        <div className={styles.tasksList}>
          <table className={styles.tasksTable}>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <tr key={task.id}>
                  <td className={styles.taskTitle}>{task.title}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(task.status)}`}>
                      {task.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className={styles.taskDate}>{task.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;